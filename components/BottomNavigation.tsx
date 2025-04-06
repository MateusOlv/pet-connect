import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter, usePathname } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export const BottomNavigation: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const tabs = [
    { name: "Home", icon: "home-outline", route: "/(tabs)/home" },
    { name: "Carrinho", icon: "cart-outline", route: "/(tabs)/cart" },
    { name: "Perfil", icon: "person-outline", route: "/(tabs)/profile" },
  ] as const;

  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.name}
          style={styles.tab}
          onPress={() => router.push(tab.route)}
        >
          <Ionicons
            name={tab.icon as any}
            size={24}
            color={pathname === tab.route ? "#FE8C00" : "#101010"}
          />
          <Text
            style={[
              styles.tabText,
              pathname === tab.route && styles.activeTabText,
            ]}
          >
            {tab.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#E5E5E5",
  },
  tab: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  tabText: {
    fontSize: 12,
    color: "#101010",
    marginTop: 4,
  },
  activeTabText: {
    color: "#FE8C00",
  },
});
