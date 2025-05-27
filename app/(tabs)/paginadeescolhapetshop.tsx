import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';

export default function PetShopScreen() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Brasília,DF</Text>
        <View style={styles.headerIcons}>
          <Feather name="more-vertical" size={24} color="white" />
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
  { icon: require('@/assets/images/image.png'), label: 'Ofertas\nDa Semana' },
  { icon: require('@/assets/images/pet-illustration.png'), label: 'Cães' },
  { icon: require('@/assets/images/pet-illustration.png'), label: 'Gatos' },
  { icon: require('@/assets/images/pet-illustration.png'), label: 'Outros Pets' },
  { icon: require('@/assets/images/pet-illustration.png'), label: 'Farma Pet' },
  { icon: require('@/assets/images/pet-illustration.png'), label: 'Higiene Pet' },
  { icon: require('@/assets/images/pet-illustration.png'), label: 'Para o\nseu Filhote' },
];

const shops = [
  { logo: require('@/assets/images/pet-illustration.png'), name: 'PetShop Cobalt', time: 'A partir de 1h32min', coupon: 'Cupom de R$ 15' },
  { logo: require('@/assets/images/pet-illustration.png'), name: 'Casa do Pet', time: 'A partir de 1h36min', coupon: 'Cupom de R$ 15' },
  { logo: require('@/assets/images/pet-illustration.png'), name: 'Home Pets', time: 'A partir de 1h38min', coupon: 'Cupom de R$ 15' },
  { logo: require('@/assets/images/pet-illustration.png'), name: 'PetShop Vegans', time: 'Amanhã, a partir das 9h', coupon: 'Cupom de R$ 25' },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
});
