import React, { ReactNode } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageSourcePropType } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface ProductCardProps {
  title: string;
  rating: number;
  distance: string;
  price: string;
  image: (() => ReactNode) | ImageSourcePropType | null;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  title,
  rating,
  distance,
  price,
  image,
}) => {
  // Renderizar o conteúdo da imagem baseado no tipo
  const renderImage = () => {
    if (typeof image === 'function') {
      return (
        <View style={[styles.image, styles.iconContainer]}>
          {image()}
        </View>
      );
    } else if (image) {
      return <Image source={image} style={styles.image} />;
    } else {
      return (
        <View style={[styles.image, styles.placeholderImage]}>
          <Text style={styles.placeholderText}>{title.substring(0, 1)}</Text>
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      {renderImage()}
      <View style={styles.content}>
        <View style={styles.details}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.metrics}>
            <View style={styles.metricItem}>
              <Ionicons name="star" size={16} color="#FE8C00" />
              <Text style={styles.metricText}>{rating}</Text>
            </View>
            <View style={styles.metricItem}>
              <Ionicons name="location" size={14} color="#FE8C00" />
              <Text style={styles.metricText}>{distance}</Text>
            </View>
          </View>
        </View>
        <Text style={styles.price}>{price}</Text>
      </View>
      <TouchableOpacity style={styles.favoriteButton}>
        <Ionicons name="heart-outline" size={20} color="#F14141" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 8,
    position: "relative",
  },
  image: {
    width: "100%",
    height: 124,
    marginBottom: 8,
    borderRadius: 8,
  },
  iconContainer: {
    backgroundColor: "#F0F0F0",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderImage: {
    backgroundColor: "#D9D9D9",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#999999",
  },
  content: {
    flexDirection: "column",
    gap: 6,
  },
  details: {
    flexDirection: "column",
    gap: 4,
  },
  title: {
    fontSize: 16,
    color: "#101010",
  },
  metrics: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  metricItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  metricText: {
    fontSize: 12,
    color: "#101010",
  },
  price: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FE8C00",
  },
  favoriteButton: {
    position: "absolute",
    top: 9,
    right: 15,
    borderRadius: 100,
    padding: 5,
  },
});
