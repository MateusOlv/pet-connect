import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
} from "react-native";
import { Link, router } from "expo-router";
import { FormInput } from "@/components/FormInput";
import { BottomBar } from "@/components/BottomBar";

const RegisterScreen = () => {
  const [email, setEmail] = useState("joao.evangelista@gmail.com");
  const [name, setName] = useState("João Victor Evangelista");
  const [password, setPassword] = useState("**********");
  const [showPassword, setShowPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(true);

  const handleRegister = () => {
    // Handle registration logic
    router.push("/login");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Crie sua nova conta.</Text>
          <Text style={styles.subtitle}>
            Crie uma conta para começar a navegar pelo nosso app.
          </Text>
        </View>

        <View style={styles.form}>
          <FormInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <FormInput label="Seu nome" value={name} onChangeText={setName} />

          <FormInput
            label="Senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            onTogglePassword={() => setShowPassword(!showPassword)}
            showPassword={showPassword}
          />

          <View style={styles.termsContainer}>
            <TouchableOpacity
              style={[styles.checkbox, termsAccepted && styles.checkboxChecked]}
              onPress={() => setTermsAccepted(!termsAccepted)}
            />
            <View style={styles.termsText}>
              <Text style={styles.termsRegularText}>Concordo com os </Text>
              <TouchableOpacity>
                <Text style={styles.termsLink}>Termos de Serviço</Text>
              </TouchableOpacity>
              <Text style={styles.termsRegularText}> e </Text>
              <TouchableOpacity>
                <Text style={styles.termsLink}>Política de Privacidade</Text>
              </TouchableOpacity>
              <Text style={styles.termsRegularText}>.</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.registerButton}
            onPress={handleRegister}
          >
            <Text style={styles.registerButtonText}>Registrar</Text>
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

      <BottomBar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 32,
  },
  header: {
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: "600",
    color: "#101010",
    lineHeight: 40,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#878787",
    lineHeight: 20,
  },
  form: {
    gap: 14,
  },
  termsContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    marginTop: 24,
    marginBottom: 24,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#D6D6D6",
  },
  checkboxChecked: {
    backgroundColor: "#FE8C00",
    borderColor: "#FE8C00",
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
  registerButton: {
    width: "100%",
    padding: 16,
    borderRadius: 100,
    backgroundColor: "#FE8C00",
    alignItems: "center",
    marginTop: 24,
    marginBottom: 24,
  },
  registerButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
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
