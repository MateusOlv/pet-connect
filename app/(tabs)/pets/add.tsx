import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { BackButton } from '@/components/BackButton';
import { FormInput } from '@/components/FormInput';
import * as SecureStore from 'expo-secure-store';
import { MOBILE_API_URL, WEB_API_URL } from '@/services/api';

const petTypes = ['Cachorro', 'Gato', 'Pássaro', 'Peixe', 'Roedor', 'Réptil', 'Outro'];

export default function AddPetScreen() {
  const [name, setName] = useState('');
  const [type, setType] = useState('Cachorro');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [nameError, setNameError] = useState('');
  const [ageError, setAgeError] = useState('');
  const [weightError, setWeightError] = useState('');
  const [showTypePicker, setShowTypePicker] = useState(false);

  const validateForm = () => {
    let isValid = true;

    if (!name.trim()) {
      setNameError('Por favor, informe o nome do pet');
      isValid = false;
    } else {
      setNameError('');
    }

    if (!age || isNaN(Number(age))) {
      setAgeError('A idade deve ser um número');
      isValid = false;
    } else {
      setAgeError('');
    }

    if (weight && isNaN(Number(weight.replace(',', '.')))) {
      setWeightError('O peso deve ser um número');
      isValid = false;
    } else {
      setWeightError('');
    }

    return isValid;
  };

  const getToken = async () => {
    try {
      if (Platform.OS === 'web') {
        return localStorage.getItem('token') || '';
      } else {
        return await SecureStore.getItemAsync('token') || '';
      }
    } catch (error) {
      console.error('Erro ao recuperar token:', error);
      return '';
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Usar o endereço correto da API de acordo com a plataforma
      const apiUrl = Platform.OS === 'web' 
        ? `${WEB_API_URL}/pets`
        : `${MOBILE_API_URL}/pets`; // Usar o IP do emulador Android ou mudar para o IP da máquina

      const petData = {
        name,
        type,
        breed: breed || undefined,
        age: age ? Number(age) : undefined,
        weight: weight ? Number(weight.replace(',', '.')) : undefined
      };

      console.log('Enviando dados do pet:', petData);

      // Obter token usando a função auxiliar
      const token = await getToken();
      
      console.log('Token de autenticação:', token ? 'Token presente' : 'Token ausente');

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(petData)
      });

      console.log('Status da resposta:', response.status);
      
      // Tentar obter corpo da resposta mesmo se não for OK para fins de diagnóstico
      let responseData;
      try {
        responseData = await response.json();
        console.log('Resposta do servidor:', responseData);
      } catch (err) {
        console.error('Erro ao processar resposta:', err);
      }

      if (!response.ok) {
        if (response.status === 401) {
          // Erro de autenticação - token inválido ou ausente
          Alert.alert(
            "Sessão expirada",
            "Sua sessão expirou. Por favor, faça login novamente.",
            [{ 
              text: "OK", 
              onPress: () => {
                if (Platform.OS === 'web') {
                  window.location.href = '/login';
                } else {
                  router.replace('/login');
                }
              } 
            }]
          );
          return;
        }
        
        throw new Error(responseData?.message || 'Erro ao cadastrar pet');
      }

      // Cadastro bem-sucedido - redirecionar diretamente sem mostrar Alert
      console.log('Pet cadastrado com sucesso!');
      Alert.alert("Pet cadastrado com sucesso!")
      
      // Redirecionar para a página de listagem de pets, adaptando para a porta em uso
      if (Platform.OS === 'web') {
        // Determinar dinamicamente a porta correta
        const currentPort = window.location.port || '8081';
        window.location.href = `http://localhost:${currentPort}/pets`;
      } else {
        router.replace('/pets');
      }
    } catch (error: any) {
      console.error("Erro ao cadastrar pet:", error);
      Alert.alert("Erro", `Não foi possível cadastrar o pet: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BackButton />
        <Text style={styles.headerTitle}>Adicionar Pet</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content}>
        <FormInput
          label="Nome do pet"
          value={name}
          onChangeText={setName}
          placeholder="Ex: Rex"
          error={nameError}
          id="pet-name"
        />

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Tipo de animal</Text>
          <TouchableOpacity 
            style={styles.pickerButton}
            onPress={() => setShowTypePicker(!showTypePicker)}
            testID="pet-type-picker"
          >
            <Text style={styles.pickerButtonText}>{type}</Text>
            <Ionicons 
              name={showTypePicker ? "chevron-up" : "chevron-down"} 
              size={20} 
              color="#666666" 
            />
          </TouchableOpacity>
          
          {showTypePicker && (
            <View style={styles.pickerOptions}>
              {petTypes.map((petType) => (
                <TouchableOpacity
                  key={petType}
                  style={[
                    styles.pickerOption,
                    petType === type && styles.pickerOptionSelected
                  ]}
                  onPress={() => {
                    setType(petType);
                    setShowTypePicker(false);
                  }}
                >
                  <Text 
                    style={[
                      styles.pickerOptionText,
                      petType === type && styles.pickerOptionTextSelected
                    ]}
                  >
                    {petType}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        <FormInput
          label="Raça (opcional)"
          value={breed}
          onChangeText={setBreed}
          placeholder="Ex: Golden Retriever"
          id="pet-breed"
        />

        <FormInput
          label="Idade (anos)"
          value={age}
          onChangeText={setAge}
          placeholder="Ex: 3"
          keyboardType="numeric"
          error={ageError}
          id="pet-age"
        />

        <FormInput
          label="Peso (kg) (opcional)"
          value={weight}
          onChangeText={setWeight}
          placeholder="Ex: 8,5"
          keyboardType="numeric"
          error={weightError}
          id="pet-weight"
        />

        <TouchableOpacity 
          style={[styles.submitButton, isLoading && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={isLoading}
          testID="submit-button"
        >
          <Text style={styles.submitButtonText}>
            {isLoading ? 'Cadastrando...' : 'Cadastrar Pet'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
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
  content: {
    padding: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#101010',
    marginBottom: 8,
  },
  pickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderWidth: 1,
    borderColor: '#D6D6D6',
    borderRadius: 8,
  },
  pickerButtonText: {
    fontSize: 14,
    color: '#101010',
  },
  pickerOptions: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#D6D6D6',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  pickerOption: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  pickerOptionSelected: {
    backgroundColor: '#FFF4E5',
  },
  pickerOptionText: {
    fontSize: 14,
    color: '#101010',
  },
  pickerOptionTextSelected: {
    color: '#FE8C00',
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: '#FE8C00',
    borderRadius: 100,
    paddingVertical: 14,
    marginTop: 24,
    marginBottom: 40,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: '#FEB766',
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
}); 