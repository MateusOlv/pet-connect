import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Alert, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';

interface Appointment {
  _id: string;
  pet: {
    name: string;
    type: string;
  };
  service: {
    name: string;
    price: string;
  };
  provider: {
    name: string;
    address: string;
  };
  appointmentDate: string;
  status: string;
}

type StatusFilter = 'todos' | 'agendado' | 'concluído' | 'cancelado';

export default function AppointmentsScreen() {
  const router = useRouter();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [filteredAppointments, setFilteredAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('todos');

  useEffect(() => {
    fetchAppointments();
  }, []);

  useEffect(() => {
    if (statusFilter === 'todos') {
      setFilteredAppointments(appointments);
    } else {
      setFilteredAppointments(appointments.filter(appointment => appointment.status === statusFilter));
    }
  }, [statusFilter, appointments]);

  const fetchAppointments = async () => {
    try {
      let token = '';
      
      if (Platform.OS === 'web') {
        token = localStorage.getItem('token') || '';
      } else {
        token = await SecureStore.getItemAsync('token') || '';
      }
      
      if (!token) {
        if (Platform.OS === 'web') {
          window.location.href = '/login';
        } else {
          router.replace('/login');
        }
        return;
      }

      // Verificar se há agendamentos simulados armazenados localmente
      let localAppointments = [];
      try {
        const mockAppointmentsJson = Platform.OS === 'web'
          ? localStorage.getItem('mockAppointments') || '[]'
          : await SecureStore.getItemAsync('mockAppointments') || '[]';
          
        localAppointments = JSON.parse(mockAppointmentsJson);
        console.log('Agendamentos locais encontrados:', localAppointments.length);
      } catch (storageError) {
        console.error('Erro ao ler agendamentos locais:', storageError);
      }

      const apiUrl = Platform.OS === 'web' 
        ? 'http://localhost:5001/api/appointments'
        : 'http://10.0.3.2:5001/api/appointments';

      const response = await fetch(apiUrl, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      
      if (response.ok) {
        if (data && data.length > 0) {
          // Combinar agendamentos da API com os locais
          const combinedAppointments = [...data, ...localAppointments];
          setAppointments(combinedAppointments);
          setFilteredAppointments(combinedAppointments);
        } else if (localAppointments.length > 0) {
          // Se não há agendamentos da API mas há locais, usar apenas os locais
          console.log('Usando apenas agendamentos locais');
          setAppointments(localAppointments);
          setFilteredAppointments(localAppointments);
        } else {
          console.log('Nenhum agendamento encontrado, usando dados simulados');
          // Se não houver nenhum agendamento, usar dados simulados fixos
          const mockAppointments = [
            {
              _id: "681aa45a3dc4a1365191d350",
              pet: {
                name: "Rex",
                type: "Cachorro"
              },
              service: {
                name: "Banho",
                price: "50"
              },
              provider: {
                name: "Pet Shop Central",
                address: "Brasília, DF"
              },
              appointmentDate: new Date(new Date().getTime() + 2*24*60*60*1000).toISOString(),
              status: "agendado"
            }
          ];
          setAppointments(mockAppointments);
          setFilteredAppointments(mockAppointments);
        }
      } else {
        // Em caso de erro na API, usar agendamentos locais ou simulados
        if (localAppointments.length > 0) {
          console.log('Erro na API, usando agendamentos locais');
          setAppointments(localAppointments);
          setFilteredAppointments(localAppointments); 
        } else {
          console.log('Erro na API, usando dados simulados fixos');
          const mockAppointments = [
            {
              _id: "681aa45a3dc4a1365191d350",
              pet: {
                name: "Rex",
                type: "Cachorro"
              },
              service: {
                name: "Banho",
                price: "50"
              },
              provider: {
                name: "Pet Shop Central",
                address: "Brasília, DF"
              },
              appointmentDate: new Date(new Date().getTime() + 2*24*60*60*1000).toISOString(),
              status: "agendado"
            }
          ];
          setAppointments(mockAppointments);
          setFilteredAppointments(mockAppointments);
        }
        setError(data.message || 'Erro ao carregar agendamentos');
      }
    } catch (err) {
      // Em caso de erro de conexão, verificar agendamentos locais
      let localAppointments = [];
      try {
        const mockAppointmentsJson = Platform.OS === 'web'
          ? localStorage.getItem('mockAppointments') || '[]'
          : await SecureStore.getItemAsync('mockAppointments') || '[]';
          
        localAppointments = JSON.parse(mockAppointmentsJson);
        
        if (localAppointments.length > 0) {
          console.log('Erro de conexão, usando agendamentos locais:', localAppointments.length);
          setAppointments(localAppointments);
          setFilteredAppointments(localAppointments);
        } else {
          console.log('Erro de conexão, usando dados simulados fixos');
          // Usar dados simulados fixos como último recurso
          const mockAppointments = [
            {
              _id: "681aa45a3dc4a1365191d350",
              pet: {
                name: "Rex",
                type: "Cachorro"
              },
              service: {
                name: "Banho",
                price: "50"
              },
              provider: {
                name: "Pet Shop Central",
                address: "Brasília, DF"
              },
              appointmentDate: new Date(new Date().getTime() + 2*24*60*60*1000).toISOString(),
              status: "agendado"
            }
          ];
          setAppointments(mockAppointments);
          setFilteredAppointments(mockAppointments);
        }
      } catch (storageError) {
        console.error('Erro ao ler agendamentos locais após falha de conexão:', storageError);
        // Dados simulados fixos como último recurso
        const mockAppointments = [
          {
            _id: "681aa45a3dc4a1365191d350",
            pet: {
              name: "Rex",
              type: "Cachorro"
            },
            service: {
              name: "Banho",
              price: "50"
            },
            provider: {
              name: "Pet Shop Central",
              address: "Brasília, DF"
            },
            appointmentDate: new Date(new Date().getTime() + 2*24*60*60*1000).toISOString(),
            status: "agendado"
          }
        ];
        setAppointments(mockAppointments);
        setFilteredAppointments(mockAppointments);
      }
      
      setError('Erro ao conectar ao servidor');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelAppointment = async (id: string) => {
    Alert.alert(
      'Cancelar Agendamento',
      'Tem certeza que deseja cancelar este agendamento?',
      [
        { text: 'Não', style: 'cancel' },
        { 
          text: 'Sim', 
          onPress: async () => {
            try {
              let token = '';
              
              if (Platform.OS === 'web') {
                token = localStorage.getItem('token') || '';
              } else {
                token = await SecureStore.getItemAsync('token') || '';
              }
              
              if (!token) {
                if (Platform.OS === 'web') {
                  window.location.href = '/login';
                } else {
                  router.replace('/login');
                }
                return;
              }

              const apiUrl = Platform.OS === 'web' 
                ? `http://localhost:5001/api/appointments/${id}`
                : `http://10.0.3.2:5001/api/appointments/${id}`;

              const response = await fetch(apiUrl, {
                method: 'DELETE',
                headers: {
                  'Authorization': `Bearer ${token}`,
                },
              });

              if (response.ok) {
                // Atualiza a lista de agendamentos
                fetchAppointments();
              } else {
                const data = await response.json();
                Alert.alert('Erro', data.message || 'Erro ao cancelar agendamento');
              }
            } catch (err) {
              Alert.alert('Erro', 'Erro ao conectar ao servidor');
              console.error(err);
            }
          }
        }
      ]
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR') + ' às ' + date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  const renderAppointmentItem = ({ item }: { item: Appointment }) => (
    <View style={styles.appointmentCard}>
      <View style={styles.appointmentHeader}>
        <View style={styles.serviceInfo}>
          <Text style={styles.serviceName}>{item.service.name}</Text>
          <Text style={styles.providerName}>{item.provider.name}</Text>
        </View>
        <View style={[styles.statusBadge, 
          item.status === 'agendado' ? styles.scheduledStatus : 
          item.status === 'concluído' ? styles.completedStatus : 
          styles.canceledStatus
        ]}>
          <Text style={[styles.statusText, 
            item.status === 'agendado' ? styles.scheduledStatusText : 
            item.status === 'concluído' ? styles.completedStatusText : 
            styles.canceledStatusText
          ]}>
            {item.status === 'agendado' ? 'Agendado' : 
             item.status === 'concluído' ? 'Concluído' : 
             'Cancelado'
            }
          </Text>
        </View>
      </View>
      
      <View style={styles.appointmentDetails}>
        <View style={styles.detailItem}>
          <Ionicons name="calendar" size={16} color="#FE8C00" />
          <Text style={styles.detailText}>{formatDate(item.appointmentDate)}</Text>
        </View>
        
        <View style={styles.detailItem}>
          <Ionicons name="paw" size={16} color="#FE8C00" />
          <Text style={styles.detailText}>{item.pet.name} ({item.pet.type})</Text>
        </View>
        
        <View style={styles.detailItem}>
          <Ionicons name="location" size={16} color="#FE8C00" />
          <Text style={styles.detailText}>{item.provider.address}</Text>
        </View>
      </View>
      
      {item.status === 'agendado' && (
        <TouchableOpacity 
          style={styles.cancelButton}
          onPress={() => handleCancelAppointment(item._id)}
        >
          <Text style={styles.cancelButtonText}>Cancelar Agendamento</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color="#FE8C00" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchAppointments}>
          <Text style={styles.retryButtonText}>Tentar Novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {appointments.length > 0 ? (
        <>
          <View style={styles.filterContainer}>
            <TouchableOpacity 
              style={[styles.filterButton, statusFilter === 'todos' && styles.activeFilterButton]}
              onPress={() => setStatusFilter('todos')}
            >
              <Text style={[styles.filterText, statusFilter === 'todos' && styles.activeFilterText]}>Todos</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.filterButton, statusFilter === 'agendado' && styles.activeFilterButton]}
              onPress={() => setStatusFilter('agendado')}
            >
              <Text style={[styles.filterText, statusFilter === 'agendado' && styles.activeFilterText]}>Agendados</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.filterButton, statusFilter === 'concluído' && styles.activeFilterButton]}
              onPress={() => setStatusFilter('concluído')}
            >
              <Text style={[styles.filterText, statusFilter === 'concluído' && styles.activeFilterText]}>Concluídos</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.filterButton, statusFilter === 'cancelado' && styles.activeFilterButton]}
              onPress={() => setStatusFilter('cancelado')}
            >
              <Text style={[styles.filterText, statusFilter === 'cancelado' && styles.activeFilterText]}>Cancelados</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={filteredAppointments}
            keyExtractor={(item) => item._id}
            renderItem={renderAppointmentItem}
            contentContainerStyle={styles.listContainer}
            ListEmptyComponent={
              <View style={styles.emptyFilterContainer}>
                <Text style={styles.emptyFilterText}>Nenhum agendamento {statusFilter === 'todos' ? '' : statusFilter}</Text>
              </View>
            }
          />
        </>
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons name="calendar-outline" size={64} color="#CCCCCC" />
          <Text style={styles.emptyText}>Você não tem agendamentos</Text>
          <TouchableOpacity 
            style={styles.newAppointmentButton}
            onPress={() => router.push('/appointments/pet-shops' as any)}
          >
            <Text style={styles.newAppointmentButtonText}>Agendar Serviço</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#F14141',
    marginBottom: 20,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#FE8C00',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  filterContainer: {
    flexDirection: 'row',
    padding: 16,
    paddingBottom: 0,
    backgroundColor: '#FFFFFF',
  },
  filterButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeFilterButton: {
    borderBottomColor: '#FE8C00',
  },
  filterText: {
    fontSize: 14,
    color: '#555555',
  },
  activeFilterText: {
    fontWeight: '600',
    color: '#FE8C00',
  },
  listContainer: {
    padding: 16,
  },
  appointmentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  appointmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#101010',
    marginBottom: 4,
  },
  providerName: {
    fontSize: 14,
    color: '#555555',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  scheduledStatus: {
    backgroundColor: '#E6F7FF',
  },
  completedStatus: {
    backgroundColor: '#E6FFE6',
  },
  canceledStatus: {
    backgroundColor: '#FFECEC',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  scheduledStatusText: {
    color: '#1890FF',
  },
  completedStatusText: {
    color: '#52C41A',
  },
  canceledStatusText: {
    color: '#F14141',
  },
  appointmentDetails: {
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#555555',
  },
  cancelButton: {
    backgroundColor: '#FFECEC',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#F14141',
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#555555',
    marginVertical: 16,
  },
  emptyFilterContainer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyFilterText: {
    fontSize: 14,
    color: '#555555',
  },
  newAppointmentButton: {
    backgroundColor: '#FE8C00',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 16,
  },
  newAppointmentButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
}); 