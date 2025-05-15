import React from 'react';
import { Stack } from 'expo-router';

export default function AppointmentsLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ 
          headerTitle: 'Agendamentos',
          headerStyle: { backgroundColor: '#FE8C00' },
          headerTitleStyle: { color: '#FFFFFF' },
          headerTintColor: '#FFFFFF',
        }} 
      />
      <Stack.Screen 
        name="pet-shops" 
        options={{ 
          headerTitle: 'Pet Shops',
          headerStyle: { backgroundColor: '#FE8C00' },
          headerTitleStyle: { color: '#FFFFFF' },
          headerTintColor: '#FFFFFF', 
        }} 
      />
      <Stack.Screen 
        name="schedule" 
        options={{ 
          headerTitle: 'Agendar Serviço',
          headerStyle: { backgroundColor: '#FE8C00' },
          headerTitleStyle: { color: '#FFFFFF' },
          headerTintColor: '#FFFFFF',
        }} 
      />
      <Stack.Screen 
        name="confirmation" 
        options={{ 
          headerTitle: 'Confirmação',
          headerStyle: { backgroundColor: '#FE8C00' },
          headerTitleStyle: { color: '#FFFFFF' },
          headerTintColor: '#FFFFFF',
        }} 
      />
    </Stack>
  );
} 