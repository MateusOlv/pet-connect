import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const HomeHeader = () => {
  return (
    <View style={styles.container}>
      <View style={styles.locationContainer}>
        <Text style={styles.locationLabel}>Sua Localização</Text>
        <View style={styles.locationRow}>
          <Ionicons name="location" size={24} color="#040404" />
          <Text style={styles.locationText}>Brasília, DF</Text>
        </View>
      </View>
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="search" size={17} color="#FF731D" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.notificationButton}>
          <Ionicons name="notifications-outline" size={30} color="#FF731D" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  locationContainer: {
    flexDirection: "column",
  },
  locationLabel: {
    fontSize: 14,
    color: "#040404",
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  locationText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#040404",
  },
  actionsContainer: {
    flexDirection: "row",
    gap: 8,
  },
  iconButton: {
    width: 29,
    height: 29,
    borderRadius: 72.5,
    borderWidth: 0.725,
    borderColor: "#FF731D",
    alignItems: "center",
    justifyContent: "center",
  },
  notificationButton: {
    width: 50,
    height: 50,
    borderRadius: 125,
    borderWidth: 1.25,
    borderColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
  },
});
