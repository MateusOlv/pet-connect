import React from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export const BackButton = () => {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => router.back()}
      activeOpacity={0.8}
    >
      <Image
        source={require("@/assets/images/back.png")}
        style={styles.icon}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#EDEDED",
    padding: 8,
    width: 36,
    height: 36,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  icon: {
    width: 20,
    height: 20,
  },
});
