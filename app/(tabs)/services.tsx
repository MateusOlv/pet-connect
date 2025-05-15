import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  FlatList,
  Image,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BackButton } from '../../components/BackButton';
import { useRouter } from 'expo-router';

// Simulação de dados de serviços
const DUMMY_SERVICES = [
  {
    id: 1,
    name: 'Banho & Tosa',
    description: 'Banho completo com hidratação e tosa higiênica',
    price: 'R$ 75,00',
    provider: 'Pet Shop Feliz',
    image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/b45a36da7e56cf45c6575e1bba44a936c52b7a9a'
  },
  {
    id: 2,
    name: 'Consulta Veterinária',
    description: 'Consulta de rotina com médico veterinário',
    price: 'R$ 120,00',
    provider: 'Clínica Vet Amigo',
    image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/fae18511cfc30143a51fb2c7a7fa25eff4c34bf8'
  },
  {
    id: 3,
    name: 'Hospedagem',
    description: 'Hospedagem por dia com 3 refeições e passeios',
    price: 'R$ 60,00',
    provider: 'Hotel Pet Paradise',
    image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/047dea9cf35a2720075cc45465ad9d807beee7fd'
  },
  {
    id: 4,
    name: 'Adestramento',
    description: 'Sessão de adestramento comportamental',
    price: 'R$ 90,00',
    provider: 'Amigos de Patas',
    image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/dd88683b186c5d28a56c05ef92f87c8a8ce0cd01'
  }
];

// Simulação de dados de pets
const DUMMY_PETS = [
  { id: 1, name: 'Luna', type: 'Cachorro', age: 3 },
  { id: 2, name: 'Felix', type: 'Gato', age: 2 },
  { id: 3, name: 'Max', type: 'Cachorro', age: 5 }
];

export default function ServicesScreen() {
  const router = useRouter();
  const [selectedService, setSelectedService] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [scheduledServices, setScheduledServices] = useState([]);

  const openScheduleModal = (service) => {
    // Redirecionar para o fluxo de agendamento de pet shops
    router.push('/appointments/pet-shops' as any);
  };

  const scheduleService = (pet) => {
    // Em um app real, aqui teríamos uma chamada à API
    const newSchedule = {
      serviceId: selectedService.id,
      serviceName: selectedService.name,
      petId: pet.id,
      petName: pet.name,
      date: new Date().toLocaleDateString(),
      price: selectedService.price,
      provider: selectedService.provider
    };

    setScheduledServices([...scheduledServices, newSchedule]);
    setModalVisible(false);
    Alert.alert(
      'Serviço Agendado',
      `${selectedService.name} agendado com sucesso para ${pet.name}`
    );
  };

  const cancelSchedule = (index) => {
    Alert.alert(
      'Cancelar Agendamento',
      'Tem certeza que deseja cancelar este agendamento?',
      [
        { text: 'Não', style: 'cancel' },
        {
          text: 'Sim',
          onPress: () => {
            const updatedSchedules = [...scheduledServices];
            updatedSchedules.splice(index, 1);
            setScheduledServices(updatedSchedules);
          }
        }
      ]
    );
  };

  const renderServiceItem = ({ item }) => (
    <TouchableOpacity
      style={styles.serviceCard}
      onPress={() => openScheduleModal(item)}
    >
      <Image source={{ uri: item.image }} style={styles.serviceImage} />
      <View style={styles.serviceInfo}>
        <Text style={styles.serviceName}>{item.name}</Text>
        <Text style={styles.serviceDescription}>{item.description}</Text>
        <View style={styles.serviceFooter}>
          <Text style={styles.serviceProvider}>{item.provider}</Text>
          <Text style={styles.servicePrice}>{item.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderScheduledServiceItem = ({ item, index }) => (
    <View style={styles.scheduledCard}>
      <View style={styles.scheduledInfo}>
        <Text style={styles.scheduledName}>{item.serviceName}</Text>
        <Text style={styles.scheduledPet}>Pet: {item.petName}</Text>
        <Text style={styles.scheduledDetails}>
          Data: {item.date} • {item.provider}
        </Text>
        <Text style={styles.scheduledPrice}>{item.price}</Text>
      </View>
      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => cancelSchedule(index)}
      >
        <Ionicons name="close-circle" size={22} color="#F14141" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Serviços</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Serviços Disponíveis</Text>
          <FlatList
            data={DUMMY_SERVICES}
            renderItem={renderServiceItem}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={false}
          />
        </View>

        {scheduledServices.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Serviços Agendados</Text>
            <FlatList
              data={scheduledServices}
              renderItem={renderScheduledServiceItem}
              keyExtractor={(item, index) => index.toString()}
              scrollEnabled={false}
            />
          </View>
        )}
      </ScrollView>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Selecione um Pet</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color="#101010" />
              </TouchableOpacity>
            </View>

            <FlatList
              data={DUMMY_PETS}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.petItem}
                  onPress={() => scheduleService(item)}
                >
                  <View style={styles.petIcon}>
                    <Text style={styles.petInitial}>{item.name[0]}</Text>
                  </View>
                  <View style={styles.petInfo}>
                    <Text style={styles.petName}>{item.name}</Text>
                    <Text style={styles.petDetails}>
                      {item.type} • {item.age} {item.age === 1 ? 'ano' : 'anos'}
                    </Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#CCCCCC" />
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#FE8C00',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 16,
  },
  content: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#101010',
    marginBottom: 16,
  },
  serviceCard: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  serviceImage: {
    width: 100,
    height: 100,
  },
  serviceInfo: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#101010',
  },
  serviceDescription: {
    fontSize: 12,
    color: '#666666',
    marginTop: 4,
  },
  serviceFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  serviceProvider: {
    fontSize: 12,
    color: '#878787',
  },
  servicePrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FE8C00',
  },
  scheduledCard: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scheduledInfo: {
    flex: 1,
  },
  scheduledName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#101010',
  },
  scheduledPet: {
    fontSize: 14,
    color: '#101010',
    marginTop: 4,
  },
  scheduledDetails: {
    fontSize: 12,
    color: '#878787',
    marginTop: 4,
  },
  scheduledPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FE8C00',
    marginTop: 4,
  },
  cancelButton: {
    padding: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 16,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#101010',
  },
  petItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  petIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FE8C00',
    justifyContent: 'center',
    alignItems: 'center',
  },
  petInitial: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  petInfo: {
    flex: 1,
    marginLeft: 12,
  },
  petName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#101010',
  },
  petDetails: {
    fontSize: 12,
    color: '#878787',
  },
}); 