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
import { Ionicons } from "@expo/vector-icons";

const LoginScreen = () => {
  const [email, setEmail] = useState("joao.evangelista@gmail.com");
  const [password, setPassword] = useState("**********");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    // Handle login logic
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.statusBar}>
        <View style={styles.statusBarContent}>
          <Text style={styles.timeText}>9:46</Text>
          <View style={styles.statusBarIcons}>
            <Ionicons name="cellular" size={17} color="#101010" />
            <Ionicons name="wifi" size={15} color="#101010" />
            <Ionicons name="battery-full" size={20} color="#101010" />
          </View>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Entre na sua conta.</Text>
          <Text style={styles.subtitle}>
            Por favor, faça login na sua conta
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Senha</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons
                  name={showPassword ? "eye-outline" : "eye-off-outline"}
                  size={20}
                  color="#101010"
                />
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
            <TouchableOpacity>
              <Text style={styles.registerLink}>Registrar</Text>
            </TouchableOpacity>
          </View>
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
    paddingHorizontal: 16, // Reduzido de 24
    paddingTop: 40, // Reduzido de 76
    gap: 16, // Reduzido de 32
  },
  header: {
    gap: 4, // Reduzido de 8
  },
  title: {
    fontSize: 28, // Reduzido de 32
    fontWeight: "600",
    color: "#101010",
    lineHeight: 36, // Reduzido de 40
  },
  subtitle: {
    fontSize: 12, // Reduzido de 14
    fontWeight: "500",
    color: "#878787",
    lineHeight: 18, // Reduzido de 20
  },
  form: {
    gap: 16, // Reduzido de 24
  },
  inputContainer: {
    gap: 4, // Reduzido de 8
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#101010",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12, // Reduzido de 16
    borderRadius: 6, // Reduzido de 8
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
    padding: 12, // Reduzido de 16
    borderRadius: 50, // Reduzido de 99
    backgroundColor: "#FE8C00",
    alignItems: "center",
  },
  loginButtonText: {
    fontSize: 12, // Reduzido de 14
    fontWeight: "600",
    color: "#FFFFFF",
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 2, // Reduzido de 4
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
    height: 24, // Reduzido de 36
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 8,
  },
  bottomIndicator: {
    width: 100, // Reduzido de 134
    height: 4, // Reduzido de 5
    backgroundColor: "#101010",
    borderRadius: 100,
  },
});

export default LoginScreen;
