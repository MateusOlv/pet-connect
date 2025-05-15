import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ConfirmationScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>Agendamento confirmado com sucesso!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  message: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4CAF50",
  },
});