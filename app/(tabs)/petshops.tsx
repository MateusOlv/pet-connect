import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { useRouter } from "expo-router";
import Icon from "react-native-vector-icons/Ionicons";
import { FontAwesome } from "@expo/vector-icons";

const PetShopCard = ({
  distance,
  rating,
  name,
  location,
  phone,
  phone2,
  onPress,
}: {
  distance: string;
  rating: string;
  name: string;
  location: string;
  phone: string;
  phone2?: string;
  onPress: () => void;
}) => {
  return (
    <View style={styles.petShopCard}>
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Text style={styles.distanceText}>Distância: {distance}</Text>
          <View style={styles.ratingContainer}>
            <FontAwesome name="star" size={6} color="#FE8C00" />
            <Text style={styles.ratingText}>{rating}</Text>
          </View>
        </View>

        <Text style={styles.petShopName}>{name}</Text>
        <Text style={styles.locationText}>{location}</Text>

        <View style={styles.phoneContainer}>
          {phone2 ? (
            <>
              <Text style={styles.phoneText}>{phone}</Text>
              <Text style={styles.dividerText}>|</Text>
              <Text style={styles.phoneText}>{phone2}</Text>
            </>
          ) : (
            <Text style={styles.phoneText}>{phone}</Text>
          )}
        </View>

        <View style={styles.availabilityContainer}>
          <Text style={styles.availabilityText}>Mediante agendamento</Text>
        </View>

        <View style={styles.divider} />

        <TouchableOpacity onPress={onPress}>
          <Text style={styles.seeMoreText}>Ver mais</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function PetShopsScreen() {
  const router = useRouter();

  const handleBackPress = () => {
    router.back();
  };

  const handlePetShopPress = (id: string) => {
    router.push(`/appointments/schedule?petshopId=${id}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Icon name="chevron-back" size={20} color="#101010" />
        </TouchableOpacity>

        <View style={styles.locationContainer}>
          <Text style={styles.locationTitle}>Sua Localização</Text>
          <View style={styles.locationInfo}>
            <Icon name="location" size={24} color="#040404" />
            <Text style={styles.locationText}>Brasília, DF</Text>
          </View>
        </View>
      </View>

      {/* Pet Shops List */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <PetShopCard
          distance="8km"
          rating="4,8"
          name="PetShop Pegada Animal"
          location="Região do Distrito Federal"
          phone="(61) 92343-9496"
          phone2="(61) 92343-9496"
          onPress={() => handlePetShopPress("1")}
        />

        <PetShopCard
          distance="12km"
          rating="4,5"
          name="Vitrine Pet"
          location="Taguatinga Sul, DF"
          phone="(61) 99876-3453"
          onPress={() => handlePetShopPress("2")}
        />

        <PetShopCard
          distance="9km"
          rating="4,3"
          name="MM PetShop"
          location="Samambaia Sul, DF"
          phone="(61) 99876-3453"
          onPress={() => handlePetShopPress("3")}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#EDEDED",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
  },
  locationContainer: {
    marginLeft: 82,
    flexDirection: "column",
    alignItems: "center",
    gap: 9,
  },
  locationTitle: {
    color: "#040404",
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 20,
    textAlign: "center",
  },
  locationInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  locationText: {
    color: "#040404",
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 20,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingHorizontal: 32,
    paddingBottom: 32,
    gap: 16,
  },
  petShopCard: {
    width: "100%",
    height: 221,
    borderRadius: 24,
    backgroundColor: "#EAEAEA",
    marginBottom: 16,
  },
  cardContent: {
    padding: 18,
    paddingTop: 30,
    height: "100%",
    position: "relative",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  distanceText: {
    color: "#717171",
    fontSize: 10,
    fontWeight: "400",
    lineHeight: 14,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    borderRadius: 24,
    paddingVertical: 2,
    paddingHorizontal: 6,
    backgroundColor: "#D9D9D9",
  },
  ratingText: {
    color: "#717171",
    fontSize: 5,
    fontWeight: "400",
    lineHeight: 8,
  },
  petShopName: {
    color: "#101010",
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 20,
    marginBottom: 8,
    width: 155,
  },
  phoneContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 14,
  },
  phoneText: {
    color: "#717171",
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 17,
  },
  dividerText: {
    color: "#717171",
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 17,
  },
  availabilityContainer: {
    width: 143,
    height: 19,
    borderRadius: 7,
    backgroundColor: "#FE8C00",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  availabilityText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "600",
    lineHeight: 16,
    textAlign: "center",
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "#D6D6D6",
    marginBottom: 17,
  },
  seeMoreText: {
    color: "#FE8C00",
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 19,
  },
});
