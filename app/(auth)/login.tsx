import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
} from "react-native";
import { Link, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { FormInput } from "@/components/FormInput";

const LoginScreen = () => {
  const [email, setEmail] = useState("@gmail.com");
  const [password, setPassword] = useState("**********");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    // Handle login logic
    router.push("/");
  };

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Entre na sua conta.</Text>
          <Text style={styles.subtitle}>
            Por favor, faça login na sua conta
          </Text>
        </View>

        <View style={styles.form}>
          <FormInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address" />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Senha</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword} />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? "eye-outline" : "eye-off-outline"}
                size={20}
                color="#101010" />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Esqueceu a senha?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Entrar</Text>
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
    <View style={styles.bottomBar}>
        <View style={styles.bottomIndicator} />
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  statusBar: {
    height: 44,
    width: "100%",
  },
  statusBarContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 21,
    paddingVertical: 12,
  },
  timeText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#101010",
  },
  statusBarIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 40,
    gap: 16,
  },
  header: {
    gap: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    color: "#101010",
    lineHeight: 36,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: "500",
    color: "#878787",
    lineHeight: 18,
  },
  form: {
    gap: 16,
  },
  inputContainer: {
    gap: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#101010",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#D6D6D6",
  },
  input: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
    color: "#101010",
  },
  forgotPassword: {
    fontSize: 14,
    fontWeight: "500",
    color: "#FE8C00",
  },
  loginButton: {
    width: "100%",
    padding: 12,
    borderRadius: 50,
    backgroundColor: "#FE8C00",
    alignItems: "center",
  },
  loginButtonText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 2,
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
  bottomBar: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 8,
  },
  bottomIndicator: {
    width: 100,
    height: 4,
    backgroundColor: "#101010",
    borderRadius: 100,
  },
});

export default LoginScreen;
