import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, usePathname } from "expo-router";

export const BottomNavigation = () => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.tab}
        onPress={() => router.push("/(tabs)/home")}
      >
        <Ionicons
          name={pathname === "/(tabs)/home" ? "home" : "home-outline"}
          size={24}
          color={pathname === "/(tabs)/home" ? "#FE8C00" : "#C2C2C2"}
        />
        {pathname === "/(tabs)/home" && (
          <Text style={styles.activeTabText}>Home</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity style={styles.tab}>
        <Ionicons name="bag-outline" size={24} color="#C2C2C2" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.tab}>
        <Ionicons name="chatbubble-outline" size={24} color="#C2C2C2" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tab}
        onPress={() => router.push("/(tabs)/profile")}
      >
        <Ionicons
          name={pathname === "/(tabs)/profile" ? "person" : "person-outline"}
          size={24}
          color={pathname === "/(tabs)/profile" ? "#FE8C00" : "#C2C2C2"}
        />
        {pathname === "/(tabs)/profile" && (
          <Text style={styles.activeTabText}>Profile</Text>
        )}
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
