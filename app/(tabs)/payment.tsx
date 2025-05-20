import React, { useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

const PaymentScreen = () => {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const handlePayment = () => {
    setIsProcessing(true);

    setTimeout(() => {
      setSuccess(true);
      setIsProcessing(false);

      setTimeout(() => {
        router.push("/"); // ou router.replace("/") se quiser substituir a rota atual
      }, 2000);
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pagamento</Text>

      {!success ? (
        <>
          <Text style={styles.subtitle}>Confirme seu pagamento para continuar.</Text>
          <TouchableOpacity
            onPress={handlePayment}
            disabled={isProcessing}
            style={[styles.button, isProcessing && styles.buttonDisabled]}
          >
            {isProcessing ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Pagar agora</Text>
            )}
          </TouchableOpacity>
        </>
      ) : (
        <Text style={styles.success}>✅ Pagamento realizado com sucesso!</Text>
      )}
    </View>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#2196F3",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  success: {
    fontSize: 20,
    color: "green",
    textAlign: "center",
  },
});
