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

    if (age && isNaN(Number(age))) {
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

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const apiUrl = Platform.OS === 'web' 
        ? 'http://10.0.3.2:5001/api/pets'
        : 'http://10.0.3.2:5001/api/pets';

      const petData = {
        name,
        type,
        breed: breed || undefined,
        age: age ? Number(age) : undefined,
        weight: weight ? Number(weight.replace(',', '.')) : undefined
      };

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(petData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao cadastrar pet');
      }

      Alert.alert(
        'Pet cadastrado',
        'Seu pet foi cadastrado com sucesso!',
        [
          { 
            text: 'OK', 
            onPress: () => {
              if (Platform.OS === 'web') {
                router.push('/pets');
              } else {
                router.back();
              }
            }
          }
        ]
      );
    } catch (error) {
      console.error('Erro ao cadastrar pet:', error);
      Alert.alert('Erro', 'Não foi possível cadastrar o pet. Tente novamente.');
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