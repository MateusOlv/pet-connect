import { Tabs } from "expo-router";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 80,
          borderTopWidth: 0,
          backgroundColor: "#fff",
          elevation: 0,
        },
        tabBarLabelStyle: {
          fontSize: 16, 
        },
        tabBarActiveTintColor: "#FE8C00",
      }}
    >
      <Tabs.Screen name="home" options={{ 
            title: "Início", 
            tabBarIcon: ({ color }) => (
              <Icon name="home" size={24} color={color} />
            ),
        }} />
      <Tabs.Screen name="cart" options={{ 
            title: "Carrinho",
            tabBarIcon: ({ color }) => (
                <Icon name="cart" size={24} color={color} />
            ),
        }} />
      <Tabs.Screen name="profile" options={{ 
            title: "Perfil",
            tabBarIcon: ({ color }) => (
                <Icon name="person" size={24} color={color} />
            ), 
        }} />
    </Tabs>
  );
}