import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { HomeHeader } from '@/components/HomeHeader';
import { BackButton } from '@/components/BackButton';
import Icon from "react-native-vector-icons/Ionicons";

export default function PetShopScreen() {
  return (
    <View style={styles.container}>
      {/* Header */}
      {/* Header */}
            <View style={styles.header}>
              <TouchableOpacity style={styles.backButton} >
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
      
      {/* Search Bar */}
      <View style={styles.searchBar}>
        <Feather name="search" size={20} color="#999" style={{ marginLeft: 10 }} />
        <TextInput
          placeholder="Buscar em PetShop"
          style={styles.searchInput}
          placeholderTextColor="#999"
        />
      </View>

      {/* Categories */}
      <View style={styles.categoriesContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((item, index) => (
            <View key={index} style={styles.categoryItem}>
              <Image source={item.icon} style={styles.categoryIcon} />
              <Text style={styles.categoryText}>{item.label}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Shops */}
      <View style={styles.shopsContainer}>
        {shops.map((shop, index) => (
          <View key={index} style={styles.shopCard}>
            <Image source={shop.logo} style={styles.shopLogo} />
            <View style={styles.shopInfo}>
              <Text style={styles.shopName}>{shop.name}</Text>
              <Text style={styles.shopTime}>{shop.time}</Text>
            </View>
            <View style={styles.couponTag}>
              <Text style={styles.couponText}>{shop.coupon}</Text>
            </View>
          </View>
        ))}
      </View>

    </View>
  );
}

const categories = [
  { icon: require('@/assets/images/image copy.png'), label: 'Ofertas\nDa Semana' },
  { icon: require('@/assets/images/image copy 2.png'), label: 'Cães' },
  { icon: require('@/assets/images/image copy 3.png'), label: 'Gatos' },
  { icon: require('@/assets/images/image copy 4.png'), label: 'Outros Pets' },
  { icon: require('@/assets/images/image copy 5.png'), label: 'Farma Pet' },
  { icon: require('@/assets/images/image copy 6.png'), label: 'Higiene Pet' },
  { icon: require('@/assets/images/image copy 7.png'), label: 'Para o\nseu Filhote' },
];

const shops = [
  { logo: require('@/assets/images/image copy 8.png'), name: 'PetShop Cobalt', time: 'A partir de 1h32min', coupon: 'Cupom de R$ 15' },
  { logo: require('@/assets/images/image copy 9.png'), name: 'Casa do Pet', time: 'A partir de 1h36min', coupon: 'Cupom de R$ 15' },
  { logo: require('@/assets/images/image copy 10.png'), name: 'Home Pets', time: 'A partir de 1h38min', coupon: 'Cupom de R$ 15' },
  { logo: require('@/assets/images/image copy 11.png'), name: 'PetShop Vegans', time: 'Amanhã, a partir das 9h', coupon: 'Cupom de R$ 25' },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 15,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  headerIcons: {
    width: 24,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    marginTop: 20,
    paddingVertical: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
  },
  categoriesContainer: {
    marginTop: 20,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 20,
  },
  categoryIcon: {
    width: 60,
    height: 60,
    marginBottom: 5,
  },
  categoryText: {
    fontSize: 12,
    textAlign: 'center',
  },
  shopsContainer: {
    marginTop: 30,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  shopCard: {
    width: '48%',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
  shopLogo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  shopInfo: {
    marginTop: 10,
  },
  shopName: {
    fontSize: 14,
    fontWeight: '600',
  },
  shopTime: {
    fontSize: 12,
    color: '#888',
  },
  couponTag: {
    marginTop: 10,
    backgroundColor: '#e7fce7',
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  couponText: {
    fontSize: 11,
    color: 'green',
    fontWeight: 'bold',
  },
  bottomProducts: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  bottomProductImage: {
    width: 50,
    height: 70,
    resizeMode: 'contain',
  },
  
  //Estilos pagina pet shop.tsx
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
});
