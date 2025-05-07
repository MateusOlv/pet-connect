module.exports = {
  expo: {
    // ... outras configurações existentes
    plugins: ["expo-router"],
    experiments: {
      typedRoutes: true
    },
    // Configuração específica para o Expo Router
    router: {
      // Ocultar segmentos de grupo da URL
      hideGroupSegmentsInUrl: true
    }
  }
}; 