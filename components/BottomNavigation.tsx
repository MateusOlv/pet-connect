import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const BottomNavigation = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.tab}>
        <Ionicons name="home" size={24} color="#FE8C00" />
        <Text style={styles.activeTabText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.tab}>
        <Ionicons name="bag-outline" size={24} color="#C2C2C2" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.tab}>
        <Ionicons name="chatbubble-outline" size={24} color="#C2C2C2" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.tab}>
        <Ionicons name="person-outline" size={24} color="#C2C2C2" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  tab: {
    alignItems: "center",
    gap: 4,
  },
  activeTabText: {
    fontSize: 12,
    color: "#FE8C00",
  },
});
