import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Platform
} from 'react-native';
import { Link, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { BackButton } from '@/components/BackButton';
import * as SecureStore from 'expo-secure-store';

interface Pet {
  _id: string;
  petId: number;
  name: string;
  type: string;
  breed?: string;
  age: number;
  weight?: number;
  createdAt: string;
}

export default function PetsScreen() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    setIsLoading(true);
    setError('');
    try {
      // Definir a URL correta da API
      const apiUrl = Platform.OS === 'web'
        ? 'http://localhost:5001/api/pets'
        : 'http://10.0.3.2:5001/api/pets';
      
      // Recuperar o token com debug extra
      let token = '';
      
      if (Platform.OS === 'web') {
        token = localStorage.getItem('token') || '';
        console.log('Token recuperado (web):', token ? 'Token existe' : 'Token não existe');
        
        // Debug para LocalStorage
        console.log('---- DEBUG LOCALSTORAGE ----');
        console.log('userId:', localStorage.getItem('userId'));
        console.log('userName:', localStorage.getItem('userName'));
        console.log('userEmail:', localStorage.getItem('userEmail'));
      } else {
        token = await SecureStore.getItemAsync('token') || '';
        console.log('Token recuperado (mobile):', token ? 'Token existe' : 'Token não existe');
      }
      
      // Se não houver token, redirecionar para login
      if (!token) {
        console.log('Token não encontrado, redirecionando para login');
        setError('Sessão não encontrada. Por favor, faça login.');
        
        // Redirecionar para login após um breve atraso
        setTimeout(() => {
          if (Platform.OS === 'web') {
            window.location.href = '/login';
          } else {
            router.replace('/login');
          }
        }, 1500);
        return;
      }
      
      console.log('Buscando pets na URL:', apiUrl);
      console.log('Headers:', { 'Authorization': `Bearer ${token ? 'token_presente' : 'token_ausente'}` });
      
      // Fazer a requisição com o token no cabeçalho
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      console.log('Status da resposta:', response.status);
      
      // Se a resposta não for OK, verificar o tipo de erro
      if (!response.ok) {
        // Tentar obter a mensagem de erro do servidor
        let errorData;
        try {
          errorData = await response.json();
        } catch (e) {
          errorData = { message: 'Erro desconhecido' };
        }
        
        console.error('Erro na API:', errorData);
        
        if (response.status === 401) {
          // Erro de autenticação
          setError('Sessão expirada. Por favor, faça login novamente.');
          
          // Limpar dados de autenticação
          if (Platform.OS === 'web') {
            localStorage.removeItem('token');
          } else {
            await SecureStore.deleteItemAsync('token');
          }
          
          // Redirecionar para login após um breve atraso
          setTimeout(() => {
            if (Platform.OS === 'web') {
              window.location.href = '/login';
            } else {
              router.replace('/login');
            }
          }, 1500);
          return;
        } else {
          // Outros erros
          throw new Error(errorData.message || 'Erro ao carregar pets');
        }
      }

      // Processar os dados recebidos
      const data = await response.json();
      console.log('Dados recebidos:', data);
      
      // Verificar se a resposta tem a estrutura esperada
      if (!Array.isArray(data) && data.pets && Array.isArray(data.pets)) {
        // Se os dados vierem dentro de um objeto com propriedade pets
        console.log('Usando data.pets para processar os dados');
        processData(data.pets);
      } else if (Array.isArray(data)) {
        // Se os dados vierem diretamente como um array
        console.log('Usando data diretamente para processar os dados');
        processData(data);
      } else {
        console.error('Formato de dados não reconhecido:', data);
        throw new Error('Formato de dados não reconhecido');
      }
    } catch (error) {
      console.error('Erro ao buscar pets:', error);
      setError('Não foi possível carregar seus pets. Tente novamente mais tarde.');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Função auxiliar para processar os dados de pets
  const processData = (data: any[]) => {
    // Filtrar pets duplicados (com mesmo nome e tipo)
    const uniquePetsMap = new Map();
      
    // Usar Map para agrupar pets por nome e tipo
    data.forEach((pet: any) => {
      const key = `${pet.name.toLowerCase()}-${pet.type.toLowerCase()}`;
      
      // Preferir o pet com o menor petId (provavelmente o mais antigo)
      if (!uniquePetsMap.has(key) || pet.petId < uniquePetsMap.get(key).petId) {
        uniquePetsMap.set(key, pet);
      }
    });
    
    // Converter o Map de volta para um array
    const uniquePets = Array.from(uniquePetsMap.values());
    
    console.log(`Total de pets: ${data.length}, Após remoção de duplicados: ${uniquePets.length}`);
    
    // Definir a lista de pets sem duplicados
    setPets(uniquePets || []);
  };

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="paw-outline" size={64} color="#CCCCCC" />
      <Text style={styles.emptyTitle}>Nenhum pet cadastrado</Text>
      <Text style={styles.emptyDescription}>
        Adicione seu primeiro pet para gerenciar seus serviços
      </Text>
      <TouchableOpacity 
        style={styles.addPetButton}
        onPress={() => router.push('/pets/add')}
      >
        <Text style={styles.addPetButtonText}>Adicionar Pet</Text>
      </TouchableOpacity>
    </View>
  );

  const renderPetItem = ({ item }: { item: Pet }) => (
    <TouchableOpacity 
      style={styles.petCard}
      onPress={() => {
        // Temporariamente, apenas mostrar um alerta ou log
        console.log(`Pet selecionado: ${item.name}`);
        // A navegação para detalhes será implementada posteriormente
      }}
    >
      <View style={styles.petAvatar}>
        <Ionicons 
          name={item.type.toLowerCase().includes('cachorro') ? 'paw-outline' : 
                item.type.toLowerCase().includes('gato') ? 'logo-octocat' :
                item.type.toLowerCase().includes('pássaro') ? 'balloon-outline' :
                item.type.toLowerCase().includes('peixe') ? 'fish-outline' : 'paw-outline'} 
          size={32} 
          color="#FE8C00" 
        />
      </View>
      <View style={styles.petInfo}>
        <Text style={styles.petName}>{item.name}</Text>
        <Text style={styles.petType}>
          {item.type}{item.breed ? ` - ${item.breed}` : ''}, {item.age} {item.age === 1 ? 'ano' : 'anos'}
        </Text>
        {item.weight && (
          <Text style={styles.petWeight}>{item.weight} kg</Text>
        )}
      </View>
      <Ionicons name="chevron-forward" size={24} color="#C2C2C2" />
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color="#FE8C00" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BackButton />
        <Text style={styles.headerTitle}>Meus Pets</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => router.push('/pets/add')}
        >
          <Ionicons name="add" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={fetchPets}>
            <Text style={styles.retryButtonText}>Tentar novamente</Text>
          </TouchableOpacity>
        </View>
      ) : pets.length === 0 ? (
        renderEmptyState()
      ) : (
        <FlatList
          data={pets}
          renderItem={renderPetItem}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 15,
    paddingBottom: 24,
    backgroundColor: '#FE8C00',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    padding: 16,
  },
  petCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  petAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFF4E5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  petInfo: {
    flex: 1,
  },
  petName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  petType: {
    fontSize: 14,
    color: '#666666',
  },
  petWeight: {
    fontSize: 12,
    color: '#666666',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 24,
  },
  addPetButton: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    backgroundColor: '#FE8C00',
    borderRadius: 100,
  },
  addPetButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  errorText: {
    fontSize: 16,
    color: '#FF3B30',
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    backgroundColor: '#FE8C00',
    borderRadius: 100,
  },
  retryButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
}); 