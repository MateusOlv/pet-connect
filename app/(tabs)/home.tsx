import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Platform, TouchableOpacity, FlatList, Text } from "react-native";
import { HomeHeader } from "../../components/HomeHeader";
import { CategoryGrid } from "../../components/CategoryGrid";
import { ProductCard } from "../../components/ProductCard";
import { Ionicons } from "@expo/vector-icons";
import * as SecureStore from 'expo-secure-store';

import { MOBILE_API_URL, WEB_API_URL } from "@/services/api";
import { router } from "expo-router";

interface Product {
  _id: string;
  productId: number;
  name: string;
  imageUrl: string;
  description: string;
  price: number;
}

export default function HomeScreen() {
  // Usando componentes de ícones em vez de imagens
  const racaoPremiumIcon = () => <Ionicons name="nutrition" size={64} color="#FF9933" />;
  const racaoFriskiesIcon = () => <Ionicons name="nutrition-outline" size={64} color="#3366FF" />;

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setIsLoading(true);
    setError('');

    try {
      const apiUrl = Platform.OS === 'web'
        ? `${WEB_API_URL}/product`
        : `${MOBILE_API_URL}/product`;

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

      if (!token) {
        console.log('Token não encontrado, redirecionando para login');
        setError('Sessão não encontrada. Por favor, faça login.');

        setTimeout(() => {
          if (Platform.OS === 'web') {
            window.location.href = '/login';
          } else {
            router.replace('/login');
          }
        }, 1500);
        return;
      }

      console.log('Buscando produtos na URL:', apiUrl);
      console.log('Headers:', { 'Authorization': `Bearer ${token ? 'token_presente' : 'token_ausente'}` });

      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      console.log('Status da resposta:', response.status);

      if (!response.ok) {
        let errorData;

        try {
          errorData = await response.json();
        } catch (e) {
          errorData = { message: 'Erro desconhecido' }
        }

        console.error('Erro na API:', errorData);

        if (response.status === 401) {
          setError('Sessão expirada. Por favor, faça login novamente.');

          if (Platform.OS === 'web') {
            localStorage.removeItem('token');
          } else {
            await SecureStore.deleteItemAsync('token');
          }

          setTimeout(() => {
            if (Platform.OS === 'web') {
              window.location.href = '/login';
            } else {
              router.replace('/login');
            }
          }, 1500);
          return;
        } else {
          throw new Error(errorData.message || 'Erro ao carregar produtos');
        }
      }

      const data = await response.json();

      if (response.ok) {
        setProducts(data);
      } else {
        setError(data.message || 'Erro ao carregar produtos');
      }
    } catch (error) {
      console.log('Erro ao buscar produtos', error);
      setError('Não foi possível carregar os produtos. Tente novamente mais tarde.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectProduct = (id: string) => {
    router.push({
      pathname: '/(tabs)/product',
      params: { id }
    } as any)
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <HomeHeader />
        </View>
        <CategoryGrid />
        <View style={styles.productsGrid}>
          <FlatList
            data={products}
            keyExtractor={(item) => item._id}
            //contentContainerStyle={{ padding: 16 }}
            //contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 16 }}
            columnWrapperStyle={{ justifyContent: "space-between", marginBottom: 16 }}
            numColumns={2}

            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleSelectProduct(item._id)}>
                <ProductCard
                  title={item.name}
                  rating={4.9}
                  distance="1km"
                  price={`R$ ${item.price.toString()}`}
                  image={racaoFriskiesIcon}
                    /*item.imageUrl
                      ? { uri: item.imageUrl } // Imagem da API
                      : null // Ou deixa o placeholder
                  }*/
                />
              </TouchableOpacity>
            )}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  content: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 9,
  },
  productsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 22,
    paddingHorizontal: 24,
    justifyContent: "space-between",
  },
});
