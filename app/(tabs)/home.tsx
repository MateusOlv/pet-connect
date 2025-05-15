import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { HomeHeader } from "../../components/HomeHeader";
import { CategoryGrid } from "../../components/CategoryGrid";
import { ProductCard } from "../../components/ProductCard";
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen() {
  // Usando componentes de ícones em vez de imagens
  const racaoPremiumIcon = () => <Ionicons name="nutrition" size={64} color="#FF9933" />;
  const racaoFriskiesIcon = () => <Ionicons name="nutrition-outline" size={64} color="#3366FF" />;

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <HomeHeader />
        </View>
        <CategoryGrid />
        <View style={styles.productsGrid}>
          <ProductCard
            title="Ração Premium"
            rating={4.9}
            distance="190m"
            price="R$143,90"
            image={racaoPremiumIcon}
          />
          <ProductCard
            title="Ração Seca Friskies"
            rating={4.8}
            distance="200m"
            price="R$60,00"
            image={racaoFriskiesIcon}
          />
          <ProductCard
            title="Ração Premium"
            rating={4.9}
            distance="190m"
            price="R$143,90"
            image={racaoPremiumIcon}
          />
          <ProductCard
            title="Ração Seca Friskies"
            rating={4.8}
            distance="200m"
            price="R$60,00"
            image={racaoFriskiesIcon}
          />
          <ProductCard
            title="Ração Premium"
            rating={4.9}
            distance="190m"
            price="R$143,90"
            image={racaoPremiumIcon}
          />
          <ProductCard
            title="Ração Seca Friskies"
            rating={4.8}
            distance="200m"
            price="R$60,00"
            image={racaoFriskiesIcon}
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
