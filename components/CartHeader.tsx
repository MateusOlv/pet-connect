import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const CartHeader: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meu Carrinho</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    position: "relative",
    alignSelf: "stretch",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#101010",
    fontFamily: "Inter, -apple-system, Roboto, Helvetica, sans-serif",
  },
});
