import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const windowWidth = Dimensions.get("window").width;
const gridPadding = 24;
const gridGap = 24;
const numberOfColumns = 4;
const availableWidth =
  windowWidth - gridPadding * 2 - (numberOfColumns - 1) * gridGap;
const itemWidth = availableWidth / numberOfColumns;

// Categorias com ícones do Ionicons
const categories = [
  { id: 1, title: "Rações", icon: "nutrition-outline" as any, color: "#FF9933", isMain: true },
  { id: 2, title: "Acessórios", icon: "paw-outline" as any, color: "#3366FF", isMain: true },
  { id: 3, title: "Banho e Tosa", icon: "water-outline" as any, color: "#33CCFF" },
  { id: 4, title: "Pet Shop", icon: "storefront-outline" as any, color: "#FF6633" },
  { id: 5, title: "Lembretes", icon: "calendar-outline" as any, color: "#66CC33" },
  { id: 6, title: "Hóspet", icon: "home-outline" as any, color: "#CC66FF" },
];

export const CategoryGrid = () => {
  const mainCategories = categories.filter((cat) => cat.isMain);
  const subCategories = categories.filter((cat) => !cat.isMain);

  return (
    <View style={styles.container}>
      <View style={styles.mainCategories}>
        {mainCategories.map((category) => (
          <TouchableOpacity key={category.id} style={styles.mainCategory}>
            <Text style={styles.mainCategoryTitle}>{category.title}</Text>
            <View style={styles.iconContainer}>
              <Ionicons name={category.icon} size={48} color={category.color} />
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.subCategories}>
        {subCategories.map((category) => (
          <TouchableOpacity key={category.id} style={styles.subCategory}>
            <View style={styles.iconContainerSmall}>
              <Ionicons name={category.icon} size={30} color={category.color} />
            </View>
            <Text style={styles.subCategoryTitle}>{category.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: gridPadding,
  },
  mainCategories: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: gridGap,
    marginBottom: 14,
  },
  mainCategory: {
    flex: 1,
    backgroundColor: "#D9D9D9",
    borderRadius: 12.94,
    height: 85,
    position: "relative",
    overflow: "hidden",
  },
  mainCategoryTitle: {
    position: "absolute",
    top: 7,
    left: 10,
    fontSize: 14,
    color: "#101010",
    zIndex: 1,
  },
  iconContainer: {
    position: "absolute",
    right: 10,
    top: 10,
    width: 70,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  subCategories: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 24,
    gap: gridGap,
  },
  subCategory: {
    width: itemWidth,
    backgroundColor: "#D9D9D9",
    borderRadius: 12.96,
    height: 81,
    position: "relative",
    alignItems: "center",
    overflow: "hidden",
  },
  iconContainerSmall: {
    width: "70%",
    height: "65%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },
  subCategoryTitle: {
    position: "absolute",
    bottom: 4,
    fontSize: 8.4,
    color: "#101010",
    textAlign: "center",
  },
});
