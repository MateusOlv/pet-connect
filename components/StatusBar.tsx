import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const StatusBarComponent = () => {
  return (
    <View style={styles.statusBar}>
      <View style={styles.statusBarContent}>
        <Text style={styles.timeText}>9:41</Text>
        <View style={styles.statusBarIcons}>
          <Ionicons name="cellular" size={17} color="#101010" />
          <Ionicons name="wifi" size={15} color="#101010" />
          <Ionicons name="battery-full" size={20} color="#101010" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  statusBar: {
    height: 44,
    width: "100%",
  },
  statusBarContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 21,
    paddingVertical: 12,
  },
  timeText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#101010",
  },
  statusBarIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
});
