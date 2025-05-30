import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Platform } from "react-native";
import { useRouter } from "expo-router";
import * as SecureStore from 'expo-secure-store';
import { MOBILE_API_URL, WEB_API_URL } from "@/services/api";

interface PetShop {
  _id: string;
  name: string;
  address: string;
}

export default function PetShopsScreen() {
  const router = useRouter();
  const [petShops, setPetShops] = useState<PetShop[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPetShops();
  }, []);

  const fetchPetShops = async () => {
    try {
      let token=''

      if (Platform.OS === 'web') {
        token = localStorage.getItem('token') || '';
        console.log('Token recuperado (web): ', token ? 'Token existe' : 'Token não existe');
      } else {
        token = await SecureStore.getItemAsync('token') || '';
        console.log('Token recuperado (web): ', token ? 'Token existe' : 'Token não existe');
      }1
      
      if (!token) {
        router.replace('/login');
        return;
      }

      const response = await fetch(Platform.OS==="web"
          ? `${WEB_API_URL}/providers`
          : `${MOBILE_API_URL}/providers`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      
      if (response.ok) {
        setPetShops(data);
      } else {
        setError(data.message || 'Erro ao carregar pet shops');
        // Se não houver dados, usar dados simulados para demonstração
        setPetShops([
          { _id: "1", name: "Dummy 1", address: "Asa Sul, Brasília" },
          { _id: "2", name: "Dummy 2", address: "Asa Norte, Brasília" },
          { _id: "3", name: "Dummy 3", address: "Taguatinga, Brasília" },
        ]);
      }
    } catch (err) {
      setError('Erro ao conectar ao servidor');
      console.error(err);
      // Se ocorrer erro, usar dados simulados para demonstração
      setPetShops([
        { _id: "1", name: "Dummy 1", address: "Asa Sul, Brasília" },
        { _id: "2", name: "Dummy 2", address: "Asa Norte, Brasília" },
        { _id: "3", name: "Dummy 3", address: "Taguatinga, Brasília" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectPetShop = (id: string) => {
    router.push({
      pathname: '/appointments/schedule',
      params: { id }
    } as any);
  };

  if (loading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color="#FE8C00" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pet Shops em Brasília</Text>
      <FlatList<PetShop>
        data={petShops}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.petShopItem}
            onPress={() => handleSelectPetShop(item._id)}
          >
            <Text style={styles.petShopName}>{item.name}</Text>
            <Text style={styles.petShopAddress}>{item.address}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  petShopItem: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  petShopName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  petShopAddress: {
    fontSize: 14,
    color: "#555",
  },
}); 