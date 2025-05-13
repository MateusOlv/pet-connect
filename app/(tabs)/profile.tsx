import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
  ActivityIndicator,
  Alert,
} from "react-native";
import { BackButton } from "@/components/BackButton";
import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import * as SecureStore from 'expo-secure-store';

export default function ProfileScreen() {
  const router = useRouter();
  const [userName, setUserName] = useState("Carregando...");
  const [userEmail, setUserEmail] = useState("Carregando...");
  const [userInitials, setUserInitials] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Função para depurar o conteúdo do localStorage
  const debugLocalStorage = () => {
    if (Platform.OS === 'web') {
      console.log('---- DEPURAÇÃO DE LOCALSTORAGE ----');
      console.log('token:', localStorage.getItem('token'));
      console.log('userId:', localStorage.getItem('userId'));
      console.log('userName:', localStorage.getItem('userName'));
      console.log('userEmail:', localStorage.getItem('userEmail'));
      console.log('--------------------------------');
    }
  };

  useEffect(() => {
    // Função para carregar os dados do usuário
    const loadUserData = async () => {
      try {
        // Depurar localStorage (apenas web)
        debugLocalStorage();
        
        // Verificar se estamos no ambiente web ou mobile
        if (Platform.OS === 'web') {
          // No ambiente web, usar localStorage
          const name = localStorage.getItem('userName') || 'Usuário';
          
          // Recuperar o email com mais logs de depuração
          const savedEmail = localStorage.getItem('userEmail');
          console.log('Email recuperado do localStorage:', savedEmail);
          
          // Definir valor padrão apenas se o email for nulo ou undefined
          let email = savedEmail;
          if (!email || email === 'null' || email === 'undefined' || email === '') {
            email = 'email@exemplo.com';
            console.log('Email inválido, usando valor padrão');
          }
          
          console.log('Email final a ser exibido:', email);
          
          setUserName(name);
          setUserEmail(email);
          
          // Gerar iniciais a partir do nome
          const initials = name
            .split(' ')
            .map(word => word.charAt(0).toUpperCase())
            .slice(0, 2)
            .join('');
          
          setUserInitials(initials || 'U');
          
          // Tentar buscar dados do usuário da API se tivermos um token
          const token = localStorage.getItem('token');
          if (token) {
            try {
              const apiUrl = 'http://10.0.3.2:5001/api/users/profile';
              const response = await fetch(apiUrl, {
                headers: {
                  'Authorization': `Bearer ${token}`
                }
              });
              
              if (response.ok) {
                const userData = await response.json();
                console.log('Dados do usuário obtidos da API:', userData);
                
                if (userData.email) {
                  console.log('Atualizando email com valor da API:', userData.email);
                  setUserEmail(userData.email);
                  localStorage.setItem('userEmail', userData.email);
                }
                
                if (userData.name) {
                  setUserName(userData.name);
                  localStorage.setItem('userName', userData.name);
                }
              }
            } catch (apiError) {
              console.error('Erro ao buscar dados do usuário da API:', apiError);
            }
          }
        } else {
          // No ambiente mobile, usar SecureStore
          const name = await SecureStore.getItemAsync('userName') || 'Usuário';
          const email = await SecureStore.getItemAsync('userEmail');
          
          console.log('Dados recuperados do SecureStore:', { name, email });
          
          setUserName(name);
          setUserEmail(email || 'email@exemplo.com');
          
          // Gerar iniciais a partir do nome
          const initials = name
            .split(' ')
            .map(word => word.charAt(0).toUpperCase())
            .slice(0, 2)
            .join('');
          
          setUserInitials(initials || 'U');
          
          // Tentar buscar dados do usuário da API se tivermos um token (mobile)
          const token = await SecureStore.getItemAsync('token');
          if (token) {
            try {
              const apiUrl = 'http://10.0.3.2:5001/api/users/profile';
              const response = await fetch(apiUrl, {
                headers: {
                  'Authorization': `Bearer ${token}`
                }
              });
              
              if (response.ok) {
                const userData = await response.json();
                console.log('Dados do usuário obtidos da API (mobile):', userData);
                
                if (userData.email) {
                  console.log('Atualizando email com valor da API (mobile):', userData.email);
                  setUserEmail(userData.email);
                  await SecureStore.setItemAsync('userEmail', userData.email);
                }
                
                if (userData.name) {
                  setUserName(userData.name);
                  await SecureStore.setItemAsync('userName', userData.name);
                }
              }
            } catch (apiError) {
              console.error('Erro ao buscar dados do usuário da API (mobile):', apiError);
            }
          }
        }
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
        // Definir valores padrão em caso de erro
        setUserName('Usuário');
        setUserEmail('email@exemplo.com');
        setUserInitials('U');
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <BackButton />
          <Text style={styles.headerTitle}>Perfil</Text>
        </View>

        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            {isLoading ? (
              <View style={styles.profileImage}>
                <ActivityIndicator size="small" color="#FE8C00" />
              </View>
            ) : (
              <View style={styles.profileImage}>
                <Text style={styles.profileInitials}>{userInitials}</Text>
              </View>
            )}
            <TouchableOpacity style={styles.editButton}>
              <Ionicons name="pencil" size={16} color="#FE8C00" />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>{userName}</Text>
          <Text style={styles.userEmail}>{userEmail}</Text>
        </View>

        <View style={styles.optionsSection}>
          <TouchableOpacity style={styles.optionItem}>
            <Ionicons name="person-outline" size={24} color="#040404" />
            <Text style={styles.optionText}>Informações Pessoais</Text>
            <Ionicons name="chevron-forward" size={24} color="#C2C2C2" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.optionItem}
            onPress={() => {
              if (Platform.OS === 'web') {
                window.location.href = 'http://localhost:8081/(tabs)/pets';
              } else {
                router.push('/(tabs)/pets');
              }
            }}
          >
            <Ionicons name="paw-outline" size={24} color="#040404" />
            <Text style={styles.optionText}>Meus Pets</Text>
            <Ionicons name="chevron-forward" size={24} color="#C2C2C2" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.optionItem}
            onPress={() => {
              if (Platform.OS === 'web') {
                window.location.href = 'http://localhost:8081/appointments';
              } else {
                router.push('/appointments');
              }
            }}
          >
            <Ionicons name="calendar-outline" size={24} color="#040404" />
            <Text style={styles.optionText}>Meus Agendamentos</Text>
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
        
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={async () => {
            // Limpar dados de autenticação
            if (Platform.OS === 'web') {
              localStorage.removeItem('token');
              localStorage.removeItem('userId');
              localStorage.removeItem('userName');
              localStorage.removeItem('userEmail');
              
              // Redirecionar para a página de login
              window.location.href = '/login';
            } else {
              await SecureStore.deleteItemAsync('token');
              await SecureStore.deleteItemAsync('userId');
              await SecureStore.deleteItemAsync('userName');
              await SecureStore.deleteItemAsync('userEmail');
              
              router.replace('/login');
            }
          }}
        >
          <Ionicons name="log-out-outline" size={24} color="#F14141" />
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
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
