import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

interface PetShop {
  id: string;
  name: string;
  address: string;
}

export default function PetShopsScreen() {
  const router = useRouter();
  const [petShops, setPetShops] = useState<PetShop[]>([
    { id: "1", name: "Pet Shop Brasília", address: "Asa Sul, Brasília" },
    { id: "2", name: "Amigo Pet", address: "Asa Norte, Brasília" },
    { id: "3", name: "Pet Love", address: "Taguatinga, Brasília" },
  ]);

  const handleSelectPetShop = (id: string) => {
    router.push(`/schedule/${id}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pet Shops em Brasília</Text>
      <FlatList<PetShop>
        data={petShops}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.petShopItem}
            onPress={() => handleSelectPetShop(item.id)}
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