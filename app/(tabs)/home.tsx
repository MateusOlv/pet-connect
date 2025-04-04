import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { StatusBarComponent } from "../../components/StatusBar";
import { HomeHeader } from "../../components/HomeHeader";
import { CategoryGrid } from "../../components/CategoryGrid";
import { ProductCard } from "../../components/ProductCard";
import { BottomNavigation } from "../../components/BottomNavigation";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <StatusBarComponent />
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
            image="https://cdn.builder.io/api/v1/image/assets/TEMP/343c1609834abbb69080988de63a2768ce9971cb"
          />
          <ProductCard
            title="Ração Seca Friskies"
            rating={4.8}
            distance="200m"
            price="R$60,00"
            image="https://cdn.builder.io/api/v1/image/assets/TEMP/e99b7319c323cb349d674b033495dc64c6202b83"
          />
        </View>
      </ScrollView>
      <BottomNavigation />
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
    gap: 22,
    paddingHorizontal: 24,
  },
});
