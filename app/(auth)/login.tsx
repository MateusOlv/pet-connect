import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Alert,
  Image,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { Link, router } from "expo-router";
import { FormInput } from "@/components/FormInput";
import * as SecureStore from 'expo-secure-store';
import { WEB_API_URL, MOBILE_API_URL } from "@/services/api";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    // Limpar erros anteriores
    setEmailError("");
    setPasswordError("");

    // Validar o formato do email
    if (!email.trim()) {
      setEmailError("Por favor, insira seu email");
      return;
    }

    if (!validateEmail(email)) {
      setEmailError("Por favor, insira um email válido");
      return;
    }

    // Validar se senha foi preenchida
    if (!password.trim()) {
      setPasswordError("Por favor, insira sua senha");
      return;
    }

    setIsLoading(true);

    try {
      const apiUrl = Platform.OS === 'web'
        ? `${WEB_API_URL}/users/login`
        : `${MOBILE_API_URL}/users/login`;

      console.log('Enviando requisição para:', apiUrl);
      console.log('Dados do login:', { email, password: '***' });

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      console.log('Status da resposta:', response.status);

      const text = await response.text();
      console.log('Texto da resposta:', text);

      let data = null;
      if (text) {
        try {
          data = JSON.parse(text);
        } catch (parseError) {
          console.error("Erro ao parsear JSON:", parseError);
          Alert.alert("Erro", "Resposta inválida do servidor");
          return;
        }
      }

      console.log('Dados da resposta:', data);

      if (response.ok) {
        // Salvando o token em algum lugar seguro
        console.log("Login bem-sucedido:", data);

        // Armazenar o token e outras informações do usuário
        if (data.token) {
          if (Platform.OS === 'web') {
            // Limpar qualquer dado antigo
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            localStorage.removeItem('userName');
            localStorage.removeItem('userEmail');

            // Armazenar novos dados
            localStorage.setItem('token', data.token);
            localStorage.setItem('userId', data.userId.toString());
            localStorage.setItem('userName', data.name || '');
            localStorage.setItem('userEmail', email);

            console.log('Dados armazenados no localStorage:', {
              token: data.token ? 'presente' : 'ausente',
              userId: data.userId,
              userName: data.name || '',
              userEmail: email
            });
          } else {
            // Em dispositivos móveis, usar SecureStore
            await SecureStore.deleteItemAsync('token');
            await SecureStore.deleteItemAsync('userId');
            await SecureStore.deleteItemAsync('userName');
            await SecureStore.deleteItemAsync('userEmail');

            // Armazenar novos dados
            await SecureStore.setItemAsync('token', data.token);
            await SecureStore.setItemAsync('userId', data.userId.toString());
            await SecureStore.setItemAsync('userName', data.name || '');
            await SecureStore.setItemAsync('userEmail', email);

            console.log('Dados armazenados no SecureStore:', {
              token: data.token ? 'presente' : 'ausente',
              userId: data.userId,
              userName: data.name || '',
              userEmail: email
            });
          }
        }

        // Redirecionar para a página inicial
        if (Platform.OS === 'web') {
          window.location.href = '/';
        } else {
          router.replace('/');
        }
      } else {
        console.log("Erro no login:", data.message);

        // Tratamento específico para diferentes tipos de erro
        if (data.message === 'Usuário não encontrado' || data.message.includes('não encontrado')) {
          setEmailError("Email não cadastrado no sistema");
          // Destacar visualmente o campo com erro
          if (Platform.OS === 'web'){
            const emailInput = document.getElementById('email-input');
            if (emailInput) emailInput.focus();
          }
        } else if (data.message === 'Email ou senha inválidos' ||
          data.message === 'Senha incorreta' ||
          data.message.includes('inválidos') ||
          data.message.includes('incorreta')) {
          setPasswordError("Senha incorreta");
          // Destacar visualmente o campo com erro
          if (Platform.OS === 'web'){
            const passwordInput = document.getElementById('password-input');
            if (passwordInput) passwordInput.focus();
          }
        } else {
          // Caso seja outro erro, mostrar um alerta
          Alert.alert("Erro no login", data.message || "Ocorreu um erro ao fazer login");
        }
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            <View style={styles.logoContainer}>
              <Image
                source={require("@/assets/images/pet-illustration.png")}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>

            <View style={styles.card}>
              <View style={styles.header}>
                <Text style={styles.title}>Entre na sua conta</Text>
                <Text style={styles.subtitle}>
                  Acesse para gerenciar seus pets
                </Text>
              </View>

              <View style={styles.form}>
                <FormInput
                  label="Email"
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    setEmailError("");
                  }}
                  keyboardType="email-address"
                  placeholder="meuemail@gmail.com"
                  error={emailError}
                  id="email-input"
                />

                <FormInput
                  label="Senha"
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    setPasswordError("");
                  }}
                  secureTextEntry={!showPassword}
                  onTogglePassword={() => setShowPassword(!showPassword)}
                  showPassword={showPassword}
                  placeholder="*******"
                  error={passwordError}
                  id="password-input"
                />

                <TouchableOpacity>
                  <Text style={styles.forgotPassword}>Esqueceu a senha?</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
                  onPress={handleLogin}
                  disabled={isLoading}
                  testID="enter-button"
                >
                  <Text style={styles.loginButtonText}>
                    {isLoading ? "Entrando..." : "Entrar"}
                  </Text>
                </TouchableOpacity>

                <View style={styles.registerContainer}>
                  <Text style={styles.registerText}>Não tem uma conta? </Text>
                  <Link href="/register" asChild>
                    <TouchableOpacity>
                      <Text style={styles.registerLink}>Registrar</Text>
                    </TouchableOpacity>
                  </Link>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  logo: {
    width: 150,
    height: 150,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  header: {
    marginBottom: 24,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#101010",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#878787",
    textAlign: "center",
  },
  form: {
    gap: 16,
  },
  forgotPassword: {
    fontSize: 14,
    fontWeight: "500",
    color: "#FE8C00",
    textAlign: "right",
    marginTop: -8,
  },
  loginButton: {
    width: "100%",
    padding: 16,
    borderRadius: 50,
    backgroundColor: "#FE8C00",
    alignItems: "center",
    marginTop: 16,
    shadowColor: "#FE8C00",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  loginButtonDisabled: {
    backgroundColor: "#FEB766",
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
  },
  registerText: {
    fontSize: 14,
    color: "#101010",
  },
  registerLink: {
    fontSize: 14,
    color: "#FE8C00",
    fontWeight: "600",
  },
});

export default LoginScreen;
