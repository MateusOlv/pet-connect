import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function TermsScreen() {
  const router = useRouter();
  const [accepted, setAccepted] = useState(false);

  const handleAcceptTerms = () => {
    // In a real app, we would store this in persistent storage
    setAccepted(true);
    router.replace("/login");
  };

  const handleViewTerms = () => {
    // Implement terms viewing logic
    console.log("View terms clicked");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      {/* Header Status Bar */}
      <View style={styles.statusBar}>
        <Text style={styles.statusBarTime}>9:41</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>
          Nossos Termos de Serviço e Política de Privacidade
        </Text>

        <Image
          source={{
            uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/6f012eccf4272703a4f5023b785adeea002e6d7c",
          }}
          style={styles.petIllustration}
          resizeMode="contain"
        />

        <View style={styles.textContainer}>
          <Text style={styles.text}>
            <Text style={styles.normalText}>Bem-vindo ao </Text>
            <Text style={styles.highlightText}>Pet Conect</Text>
            <Text style={styles.normalText}>, </Text>
            <Text style={styles.normalText}>
              Estes Termos de Serviço regulam o uso do aplicativo Pet Conect e
              de todos os serviços associados.
            </Text>
          </Text>
        </View>

        <Image
          source={{
            uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/1e624aa7453aab4060f4c3de231c342b4634d9b5",
          }}
          style={styles.documentIllustration}
          resizeMode="contain"
        />

        <View style={styles.textContainer}>
          <Text style={styles.text}>
            <Text style={styles.normalText}>Ao acessar ou usar o </Text>
            <Text style={styles.highlightText}>Pet Conect</Text>
            <Text style={styles.normalText}>
              , você concorda em cumprir estes Termos. Se não concordar, não use
              o aplicativo.
            </Text>
          </Text>
        </View>
      </ScrollView>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          onPress={handleViewTerms}
          activeOpacity={0.7}
          style={styles.viewTermsButton}
        >
          <Text style={styles.viewTermsLink}>
            Clique para visualizar os Termos.
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.acceptButton}
          onPress={handleAcceptTerms}
          activeOpacity={0.7}
        >
          <Text style={styles.acceptButtonText}>Aceitar Termos</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomBar}>
        <View style={styles.bottomIndicator} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  statusBar: {
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingHorizontal: 21,
  },
  statusBarTime: {
    fontSize: 14,
    fontWeight: "500",
    color: "#101010",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 24,
  },
  title: {
    fontSize: 29,
    fontWeight: "700",
    color: "#101010",
    textAlign: "center",
    lineHeight: 28,
    marginBottom: 42,
  },
  petIllustration: {
    width: 227,
    height: 227,
    marginBottom: 24,
  },
  documentIllustration: {
    width: 227,
    height: 227,
    marginBottom: 24,
    alignSelf: "center",
  },
  textContainer: {
    marginBottom: 24,
  },
  text: {
    fontSize: 16,
    textAlign: "center",
  },
  normalText: {
    color: "#101010",
  },
  highlightText: {
    color: "#FF731D",
  },
  buttonsContainer: {
    paddingHorizontal: 24,
    paddingBottom: 16,
    alignItems: "center",
    width: "100%",
    zIndex: 1,
  },
  viewTermsButton: {
    padding: 10,
    marginBottom: 14,
  },
  viewTermsLink: {
    fontSize: 16,
    color: "#FF731D",
    textDecorationLine: "underline",
    textAlign: "center",
  },
  acceptButton: {
    width: "100%",
    maxWidth: 327,
    height: 56,
    backgroundColor: "#FE8C00",
    borderRadius: 91,
    justifyContent: "center",
    alignItems: "center",
  },
  acceptButtonText: {
    fontSize: 16,
    color: "#ffffff",
    fontWeight: "600",
  },
  bottomBar: {
    height: 36,
    width: "100%",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingBottom: 8,
  },
  bottomIndicator: {
    width: 134,
    height: 5,
    backgroundColor: "#101010",
    borderRadius: 100,
  },
});
