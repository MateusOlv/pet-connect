import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const windowWidth = Dimensions.get("window").width;
const gridPadding = 24;
const gridGap = 24;
const numberOfColumns = 4;
const availableWidth =
  windowWidth - gridPadding * 2 - (numberOfColumns - 1) * gridGap;
const itemWidth = availableWidth / numberOfColumns;

const categories = [
  { id: 1, title: "Rações", image: "https://cdn.builder.io/api/v1/image/assets/TEMP/c485c2979ac54c6cac8c2f4e1b6f095e7262d17f", isMain: true },
  { id: 2, title: "Acessórios", image: "https://cdn.builder.io/api/v1/image/assets/TEMP/41729044461ec754b439ddec55bf2050f24b2b39", isMain: true },
  { id: 3, title: "Banho e Tosa", image: "https://cdn.builder.io/api/v1/image/assets/TEMP/b45a36da7e56cf45c6575e1bba44a936c52b7a9a" },
  { id: 4, title: "Pet Shop", image: "https://cdn.builder.io/api/v1/image/assets/TEMP/dd88683b186c5d28a56c05ef92f87c8a8ce0cd01" },
  { id: 5, title: "Lembretes", image: "https://cdn.builder.io/api/v1/image/assets/TEMP/047dea9cf35a2720075cc45465ad9d807beee7fd" },
  { id: 6, title: "Hóspet", image: "https://cdn.builder.io/api/v1/image/assets/TEMP/fae18511cfc30143a51fb2c7a7fa25eff4c34bf8" },
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
            <Image
              source={{ uri: category.image }}
              style={styles.mainCategoryImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.subCategories}>
        {subCategories.map((category) => (
          <TouchableOpacity key={category.id} style={styles.subCategory}>
            <Image
              source={{ uri: category.image }}
              style={styles.subCategoryImage}
              resizeMode="contain"
            />
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
  mainCategoryImage: {
    position: "absolute",
    right: 10,
    top: 1.5,
    width: 82,
    height: 82,
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
  subCategoryImage: {
    width: "70%",
    height: "80%",
    position: "absolute",
    top: 5,
  },
  subCategoryTitle: {
    position: "absolute",
    bottom: 4,
    fontSize: 8.4,
    color: "#101010",
    textAlign: "center",
  },
});
