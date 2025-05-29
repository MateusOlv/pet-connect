import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";

const PaymentScreen = () => {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const [name, setName] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [cep, setCep] = useState("");
  const [state, setState] = useState("");

  const handlePayment = () => {
    if (!name || !street || !number || !cep || !state) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      setSuccess(true);
      setIsProcessing(false);

      setTimeout(() => {
        router.push("/");
      }, 2000);
    }, 1500);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Pagamento</Text>

      {!success ? (
        <>
          <Text style={styles.subtitle}>
            Preencha os dados para entrega e finalize o pagamento.
          </Text>

          <TextInput
            placeholder="Nome completo"
            style={styles.input}
            value={name}
            onChangeText={setName}
          />
          <TextInput
            placeholder="Rua"
            style={styles.input}
            value={street}
            onChangeText={setStreet}
          />
          <TextInput
            placeholder="Número"
            style={styles.input}
            value={number}
            onChangeText={setNumber}
            keyboardType="numeric"
          />
          <TextInput
            placeholder="CEP"
            style={styles.input}
            value={cep}
            onChangeText={setCep}
            keyboardType="numeric"
          />
          <TextInput
            placeholder="Estado"
            style={styles.input}
            value={state}
            onChangeText={setState}
          />

          <Text style={styles.qrLabel}>Escaneie o QR Code para realizar o pagamento:</Text>
          <Image
            source={{
              uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Link_pra_pagina_principal_da_Wikipedia-PT_em_codigo_QR_b.svg/420px-Link_pra_pagina_principal_da_Wikipedia-PT_em_codigo_QR_b.svg.png",
            }}
            style={styles.qrCode}
            resizeMode="contain"
          />

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
    </ScrollView>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
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
  input: {
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  qrLabel: {
    marginTop: 16,
    marginBottom: 8,
    fontSize: 16,
    textAlign: "center",
  },
  qrCode: {
    width: 200,
    height: 200,
    marginBottom: 16,
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
