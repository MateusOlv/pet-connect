import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { BackButton } from "@/components/BackButton";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <BackButton />
          <Text style={styles.headerTitle}>Perfil</Text>
        </View>

        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <View style={styles.profileImage}>
              <Text style={styles.profileInitials}>JD</Text>
            </View>
            <TouchableOpacity style={styles.editButton}>
              <Ionicons name="pencil" size={16} color="#FE8C00" />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>John Doe</Text>
          <Text style={styles.userEmail}>john.doe@example.com</Text>
        </View>

        <View style={styles.optionsSection}>
          <TouchableOpacity style={styles.optionItem}>
            <Ionicons name="person-outline" size={24} color="#040404" />
            <Text style={styles.optionText}>Informações Pessoais</Text>
            <Ionicons name="chevron-forward" size={24} color="#C2C2C2" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionItem}>
            <Ionicons name="paw-outline" size={24} color="#040404" />
            <Text style={styles.optionText}>Meus Pets</Text>
            <Ionicons name="chevron-forward" size={24} color="#C2C2C2" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionItem}>
            <Ionicons name="location-outline" size={24} color="#040404" />
            <Text style={styles.optionText}>Endereços</Text>
            <Ionicons name="chevron-forward" size={24} color="#C2C2C2" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionItem}>
            <Ionicons name="card-outline" size={24} color="#040404" />
            <Text style={styles.optionText}>Métodos de Pagamento</Text>
            <Ionicons name="chevron-forward" size={24} color="#C2C2C2" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionItem}>
            <Ionicons name="notifications-outline" size={24} color="#040404" />
            <Text style={styles.optionText}>Notificações</Text>
            <Ionicons name="chevron-forward" size={24} color="#C2C2C2" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionItem}>
            <Ionicons name="settings-outline" size={24} color="#040404" />
            <Text style={styles.optionText}>Configurações</Text>
            <Ionicons name="chevron-forward" size={24} color="#C2C2C2" />
          </TouchableOpacity>
        </View>
        
        <Link href="/login" asChild>
          <TouchableOpacity style={styles.logoutButton}>
            <Ionicons name="log-out-outline" size={24} color="#F14141" />
            <Text style={styles.logoutText}>Sair</Text>
          </TouchableOpacity>
        </Link>
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 15,
    paddingBottom: 24,
    backgroundColor: "#FE8C00",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#FFFFFF",
    marginLeft: 16,
  },
  profileSection: {
    alignItems: "center",
    paddingVertical: 24,
    backgroundColor: "#FFFFFF",
  },
  profileImageContainer: {
    position: "relative",
    marginBottom: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
  },
  profileInitials: {
    fontSize: 36,
    fontWeight: "600",
    color: "#FE8C00",
  },
  editButton: {
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  userName: {
    fontSize: 24,
    fontWeight: "600",
    color: "#040404",
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: "#666666",
  },
  optionsSection: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    color: "#040404",
    marginLeft: 16,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    marginTop: 24,
    marginBottom: 32,
  },
  logoutText: {
    fontSize: 16,
    color: "#F14141",
    marginLeft: 8,
  },
});
