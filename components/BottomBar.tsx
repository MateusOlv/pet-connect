import React from "react";
import { View, StyleSheet } from "react-native";

export const BottomBar = () => {
  return (
    <View style={styles.bottomBar}>
      <View style={styles.bottomIndicator} />
    </View>
  );
};

const styles = StyleSheet.create({
  bottomBar: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 36,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 8,
  },
  bottomIndicator: {
    width: 134,
    height: 5,
    backgroundColor: "#101010",
    borderRadius: 100,
  },
});
