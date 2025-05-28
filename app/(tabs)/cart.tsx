import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";
import { CartItem } from "../../components/CartItem";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import * as SecureStore from 'expo-secure-store';
import { MOBILE_API_URL, WEB_API_URL } from "@/services/api";

type CartItemType = {
  id: string;
  image: string;
  name: string;
  price: string; // Ex.: "R$ 99,90"
  quantity: number;
};

export default function CartScreen() {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);

  useEffect(() => {
    fetchCart();
  }, []);

  const apiUrl = Platform.OS === 'web'
    ? `${WEB_API_URL}`
    : `${MOBILE_API_URL}`;


  const fetchCart = async () => {
    try {
      // Recuperar o token com debug extra
      let token = '';

      if (Platform.OS === 'web') {
        token = localStorage.getItem('token') || '';
        console.log('Token recuperado (web):', token ? 'Token existe' : 'Token não existe');

        // Debug para LocalStorage
        console.log('---- DEBUG LOCALSTORAGE ----');
        console.log('userId:', localStorage.getItem('userId'));
        console.log('userName:', localStorage.getItem('userName'));
        console.log('userEmail:', localStorage.getItem('userEmail'));
      } else {
        token = await SecureStore.getItemAsync('token') || '';
        console.log('Token recuperado (mobile):', token ? 'Token existe' : 'Token não existe');
      }

      // Se não houver token, redirecionar para login
      if (!token) {
        console.log('Token não encontrado, redirecionando para login');

        // Redirecionar para login após um breve atraso
        setTimeout(() => {
          if (Platform.OS === 'web') {
            window.location.href = '/login';
          } else {
            router.replace('/login');
          }
        }, 1500);
        return;
      }

      console.log('Buscando itens na URL:', apiUrl);
      console.log('Headers:', { 'Authorization': `Bearer ${token ? 'token_presente' : 'token_ausente'}` });


      const response = await fetch(`${apiUrl}/cart`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        setCartItems(
          data.items.map((item: { product: { _id: any; imageUrl: any; name: any; price: number; }; quantity: any; }) => ({
            id: item.product._id,
            image: item.product.imageUrl,
            name: item.product.name,
            price: `R$ ${item.product.price.toFixed(2).replace(".", ",")}`,
            quantity: item.quantity,
          }))
        );
      } else {
        Alert.alert("Erro", data.message);
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar o carrinho");
    }
  };

  const updateCart = async (productId: string, quantity: number) => {
    try {
      // Recuperar o token com debug extra
      let token = '';

      if (Platform.OS === 'web') {
        token = localStorage.getItem('token') || '';
        console.log('Token recuperado (web):', token ? 'Token existe' : 'Token não existe');

        // Debug para LocalStorage
        console.log('---- DEBUG LOCALSTORAGE ----');
        console.log('userId:', localStorage.getItem('userId'));
        console.log('userName:', localStorage.getItem('userName'));
        console.log('userEmail:', localStorage.getItem('userEmail'));
      } else {
        token = await SecureStore.getItemAsync('token') || '';
        console.log('Token recuperado (mobile):', token ? 'Token existe' : 'Token não existe');
      }

      // Se não houver token, redirecionar para login
      if (!token) {
        console.log('Token não encontrado, redirecionando para login');

        // Redirecionar para login após um breve atraso
        setTimeout(() => {
          if (Platform.OS === 'web') {
            window.location.href = '/login';
          } else {
            router.replace('/login');
          }
        }, 1500);
        return;
      }

      const response = await fetch(`${apiUrl}/cart/add`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, quantity }),
      });

      const data = await response.json();
      if (!response.ok) {
        Alert.alert("Erro", data.message);
      } else {
        fetchCart(); // Atualiza o carrinho
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível atualizar o carrinho");
    }
  };

  const removeFromCart = async (productId: string) => {
    try {

      // Recuperar o token com debug extra
      let token = '';

      if (Platform.OS === 'web') {
        token = localStorage.getItem('token') || '';
        console.log('Token recuperado (web):', token ? 'Token existe' : 'Token não existe');

        // Debug para LocalStorage
        console.log('---- DEBUG LOCALSTORAGE ----');
        console.log('userId:', localStorage.getItem('userId'));
        console.log('userName:', localStorage.getItem('userName'));
        console.log('userEmail:', localStorage.getItem('userEmail'));
      } else {
        token = await SecureStore.getItemAsync('token') || '';
        console.log('Token recuperado (mobile):', token ? 'Token existe' : 'Token não existe');
      }

      // Se não houver token, redirecionar para login
      if (!token) {
        console.log('Token não encontrado, redirecionando para login');

        // Redirecionar para login após um breve atraso
        setTimeout(() => {
          if (Platform.OS === 'web') {
            window.location.href = '/login';
          } else {
            router.replace('/login');
          }
        }, 1500);
        return;
      }

      const response = await fetch(`${apiUrl}/cart/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (!response.ok) {
        Alert.alert("Erro", data.message);
      } else {
        fetchCart(); // Atualiza o carrinho
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível remover o produto");
    }
  };

  const handleIncrement = (id: string) => {
    const item = cartItems.find((item) => item.id === id);
    if (item) {
      updateCart(id, 1);
    }
  };

  const handleDecrement = (id: string) => {
    const item = cartItems.find((item) => item.id === id);
    if (item && item.quantity > 1) {
      updateCart(id, -1);
    } else {
      removeFromCart(id);
    }
  };

  const total = cartItems.reduce(
    (sum, item) =>
      sum +
      parseFloat(item.price.replace("R$ ", "").replace(",", ".")) *
      item.quantity,
    0
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
              title={item.name}
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
          <TouchableOpacity
            style={styles.checkoutButton}
            onPress={() => router.push("/payment")}
          >
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
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 10,
    marginBottom: 10,
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
