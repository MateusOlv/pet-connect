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

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [cpf, setCpf] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [cpfError, setCpfError] = useState("");
  const [termsError, setTermsError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateCPF = (cpf: string) => {
    // Remove caracteres não numéricos
    const cleanCPF = cpf.replace(/\D/g, '');
    // Verifica se tem 11 dígitos
    return cleanCPF.length === 11;
  };

  const handleRegister = async () => {
    // Limpar erros anteriores
    setEmailError("");
    setNameError("");
    setPasswordError("");
    setCpfError("");
    setTermsError("");
    
    let hasError = false;
    
    // Validar email
    if (!email.trim()) {
      setEmailError("Por favor, insira seu email");
      hasError = true;
    } else if (!validateEmail(email)) {
      setEmailError("Por favor, insira um email válido");
      hasError = true;
    }
    
    // Validar nome
    if (!name.trim()) {
      setNameError("Por favor, insira seu nome");
      hasError = true;
    }
    
    // Validar CPF
    if (!cpf.trim()) {
      setCpfError("Por favor, insira seu CPF");
      hasError = true;
    } else if (!validateCPF(cpf)) {
      setCpfError("Por favor, insira um CPF válido (11 dígitos)");
      hasError = true;
    }
    
    // Validar senha
    if (!password.trim()) {
      setPasswordError("Por favor, insira uma senha");
      hasError = true;
    } else if (password.length < 6) {
      setPasswordError("A senha deve ter pelo menos 6 caracteres");
      hasError = true;
    }
    
    // Validar aceitação dos termos
    if (!termsAccepted) {
      setTermsError("Você precisa aceitar os termos para continuar");
      hasError = true;
    }
    
    if (hasError) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      // URL adaptativa dependendo da plataforma
      const apiUrl = 'http://localhost:5001/api/users/register';
      
      console.log('Enviando requisição para:', apiUrl);
      console.log('Dados do formulário:', { email, name, CPF: cpf, password: '***' });
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email, 
          name, 
          password, 
          CPF: cpf.replace(/\D/g, '') // Envia o CPF sem formatação
        }),
      });
      
      console.log('Status da resposta:', response.status);
      const data = await response.json();
      console.log('Dados da resposta:', data);
      
      if (response.ok) {
        // Registro bem-sucedido, armazenar dados básicos
        if (Platform.OS === 'web') {
          localStorage.setItem('userEmail', email);
          localStorage.setItem('userName', name);
        } else {
          await SecureStore.setItemAsync('userEmail', email);
          await SecureStore.setItemAsync('userName', name);
        }
        
        // Redirecionar para página de login após registro bem-sucedido
        console.log("Registro bem-sucedido, redirecionando para login");
        
        // Implementação mais simples e direta de redirecionamento
        window.location.href = '/login';
      } else {
        if (data.message === 'Usuário já existe') {
          setEmailError("Este email já está registrado");
        } else if (data.message === 'CPF já cadastrado') {
          setCpfError("Este CPF já está cadastrado");
        } else {
          Alert.alert("Erro no registro", data.message || "Ocorreu um erro ao registrar sua conta");
        }
      }
    } catch (error) {
      console.error("Erro ao registrar:", error);
      Alert.alert("Erro de conexão", "Não foi possível conectar ao servidor");
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
                source={require("@/assets/images/document-illustration.png.png")}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>

            <View style={styles.card}>
              <View style={styles.header}>
                <Text style={styles.title}>Crie sua conta</Text>
                <Text style={styles.subtitle}>
                  Registre-se para acessar seus pets
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
                />

                <FormInput 
                  label="Seu nome" 
                  value={name} 
                  onChangeText={(text) => {
                    setName(text);
                    setNameError("");
                  }}
                  placeholder="Fulano da Silva"
                  error={nameError}
                />

                <FormInput 
                  label="CPF" 
                  value={cpf} 
                  onChangeText={(text) => {
                    setCpf(text);
                    setCpfError("");
                  }}
                  keyboardType="numeric"
                  placeholder="000.000.000-00"
                  error={cpfError}
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

                <View style={styles.termsContainer}>
                  <TouchableOpacity
                    style={[
                      styles.checkbox, 
                      termsAccepted && styles.checkboxChecked,
                      termsError && styles.checkboxError
                    ]}
                    onPress={() => {
                      setTermsAccepted(!termsAccepted);
                      setTermsError("");
                    }}
                    testID="checkbox"
                  />
                  <View style={styles.termsText}>
                    <Text style={styles.termsRegularText}>Concordo com os </Text>
                    <Link href="/terms" asChild>
                      <TouchableOpacity>
                        <Text style={styles.termsLink}>Termos de Serviço</Text>
                      </TouchableOpacity>
                    </Link>
                    <Text style={styles.termsRegularText}> e </Text>
                    <TouchableOpacity>
                      <Text style={styles.termsLink}>Política de Privacidade</Text>
                    </TouchableOpacity>
                    <Text style={styles.termsRegularText}>.</Text>
                  </View>
                </View>

                {termsError ? <Text style={styles.errorText}>{termsError}</Text> : null}

                <TouchableOpacity
                  style={[styles.registerButton, isLoading && styles.registerButtonDisabled]}
                  onPress={handleRegister}
                  disabled={isLoading}
                >
                  <Text style={styles.registerButtonText}>
                    {isLoading ? "Registrando..." : "Registrar"}
                  </Text>
                </TouchableOpacity>

                <View style={styles.loginContainer}>
                  <Text style={styles.loginText}>Já tem uma conta? </Text>
                  <Link href="/login" asChild>
                    <TouchableOpacity>
                      <Text style={styles.loginLink}>Entrar</Text>
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
    paddingBottom: 40,
  },
  logoContainer: {
    alignItems: "center",
    marginVertical: 24,
  },
  logo: {
    width: 120,
    height: 120,
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
    gap: 12,
  },
  termsContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    marginTop: 16,
    marginBottom: 8,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#D6D6D6",
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: "#FE8C00",
    borderColor: "#FE8C00",
  },
  checkboxError: {
    borderColor: "#FF3B30",
  },
  termsText: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  termsRegularText: {
    fontSize: 14,
    color: "#101010",
    lineHeight: 20,
  },
  termsLink: {
    fontSize: 14,
    color: "#FE8C00",
    fontWeight: "600",
    lineHeight: 20,
  },
  errorText: {
    fontSize: 12,
    color: "#FF3B30",
    marginTop: 4,
  },
  registerButton: {
    width: "100%",
    padding: 16,
    borderRadius: 50,
    backgroundColor: "#FE8C00",
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#FE8C00",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  registerButtonDisabled: {
    backgroundColor: "#FEB766",
  },
  registerButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
  },
  loginText: {
    fontSize: 14,
    color: "#101010",
  },
  loginLink: {
    fontSize: 14,
    color: "#FE8C00",
    fontWeight: "600",
  },
});

export default RegisterScreen;
