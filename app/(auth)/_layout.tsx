import { Stack } from 'expo-router';

// Configuração para esconder o segmento de grupo na URL
export const config = {
  hideGroupSegmentsInUrl: true
};

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
      <Stack.Screen name="terms" />
    </Stack>
  );
} 