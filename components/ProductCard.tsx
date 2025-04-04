import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface ProductCardProps {
  title: string;
  rating: number;
  distance: string;
  price: string;
  image: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  title,
  rating,
  distance,
  price,
  image,
}) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
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
