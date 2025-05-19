import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { CartItem } from "../../components/CartItem";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

export default function CartScreen() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/343c1609834abbb69080988de63a2768ce9971cb",
      title: "Ração Premium",
      price: "R$ 143,90",
      quantity: 1,
    },
    {
      id: 2,
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/e99b7319c323cb349d674b033495dc64c6202b83",
      title: "Ração Seca Friskies",
      price: "R$ 60,00",
      quantity: 1,
    },
  ]);

  const handleIncrement = (id: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const handleDecrement = (id: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    );
  };

  const total = cartItems.reduce(
    (sum, item) =>
      sum +
      parseFloat(item.price.replace("R$ ", "").replace(",", ".")) *
        item.quantity,
    0,
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Meu Carrinho</Text>
        <ScrollView
          style={styles.itemsList}
          showsVerticalScrollIndicator={false}
        >
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              image={item.image}
              title={item.title}
              price={item.price}
              quantity={item.quantity}
              onIncrement={() => handleIncrement(item.id)}
              onDecrement={() => handleDecrement(item.id)}
            />
          ))}
        </ScrollView>
        <View style={styles.footer}>
          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalAmount}>
              {`R$ ${total.toFixed(2).replace(".", ",")}`}
            </Text>
          </View>
          <TouchableOpacity style={styles.checkoutButton} onPress={() => router.push("/payment")}>
            <Text style={styles.checkoutButtonText}>Finalizar Compra</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#101010",
    marginBottom: 24,
  },
  itemsList: {
    flex: 1,
  },
  footer: {
    paddingVertical: 24,
    borderTopWidth: 1,
    borderTopColor: "#E5E5E5",
    backgroundColor: "#FFFFFF",
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 16,
    color: "#101010",
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: "700",
    color: "#FE8C00",
  },
  checkoutButton: {
    backgroundColor: "#FE8C00",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
  },
  checkoutButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
