import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { MaterialIcons, FontAwesome, Feather, Entypo } from '@expo/vector-icons';

const products = [
  {
    name: 'Ração Premium',
    //image: require('@/assets/images/back.png'),  substitua com imagem local ou URL remota
    rating: 4.9,
    distance: '190m',
    price: 'R$143,90'
  },
  {
    name: 'Ração Seca Friskies',
    //image: require('./assets/friskies.png'),
    rating: 4.8,
    distance: '200m',
    price: 'R$60,00'
  },
];

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.locationText}>Sua Localização</Text>
          <View style={styles.locationRow}>
            <MaterialIcons name="location-on" size={18} color="#f97316" />
            <Text style={styles.cityText}>Brasília, DF</Text>
          </View>
        </View>
        <View style={styles.iconsRow}>
          <Feather name="search" size={22} color="#f97316" style={styles.icon} />
          <Feather name="bell" size={22} color="#f97316" />
        </View>
      </View>

      {/* Categories */}
      <View style={styles.categoriesContainer}>
        {['Rações', 'Acessórios', 'Banho e Tosa', 'Pet Shop', 'Lembretes', 'Hóspet'].map((item, idx) => (
          <View key={idx} style={styles.categoryBox}>
            <Text style={styles.categoryText}>{item}</Text>
          </View>
        ))}
      </View>

      {/* Products */}
      <FlatList
        data={products}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        contentContainerStyle={styles.productsList}
        renderItem={({ item }) => (
          <View style={styles.productCard}>
            <TouchableOpacity style={styles.heartIcon}>
              <FontAwesome name="heart-o" size={18} color="red" />
            </TouchableOpacity>
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productDetails}>⭐ {item.rating} · {item.distance}</Text>
            <Text style={styles.productPrice}>{item.price}</Text>
          </View>
        )}
      />

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <View style={styles.navItemActive}>
          <Entypo name="home" size={20} color="#f97316" />
          <Text style={styles.navTextActive}>Home</Text>
        </View>
        <View style={styles.navItem}>
          <MaterialIcons name="calendar-today" size={20} color="#9ca3af" />
          <Text style={styles.navText}>Agenda</Text>
        </View>
        <View style={styles.navItem}>
          <Feather name="message-circle" size={20} color="#9ca3af" />
          <Text style={styles.navText}>Chat</Text>
        </View>
        <View style={styles.navItem}>
          <Feather name="user" size={20} color="#9ca3af" />
          <Text style={styles.navText}>Perfil</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 48,
    backgroundColor: '#fff'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  locationText: {
    color: '#6b7280',
    fontSize: 12
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2
  },
  cityText: {
    fontWeight: 'bold',
    fontSize: 14
  },
  iconsRow: {
    flexDirection: 'row',
    gap: 16
  },
  icon: {
    marginRight: 8
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20
  },
  categoryBox: {
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginRight: 8,
    marginBottom: 8
  },
  categoryText: {
    fontSize: 12,
    textAlign: 'center'
  },
  productsList: {
    paddingBottom: 80
  },
  productCard: {
    flex: 1,
    margin: 4,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 8,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
    position: 'relative'
  },
  productImage: {
    width: '100%',
    height: 100,
    borderRadius: 8
  },
  heartIcon: {
    position: 'absolute',
    top: 8,
    right: 8
  },
  productName: {
    fontWeight: '600',
    marginTop: 8,
    fontSize: 14
  },
  productDetails: {
    fontSize: 12,
    color: '#6b7280'
  },
  productPrice: {
    color: '#f97316',
    fontWeight: 'bold',
    marginTop: 4,
    fontSize: 14
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb'
  },
  navItem: {
    alignItems: 'center'
  },
  navItemActive: {
    alignItems: 'center'
  },
  navText: {
    fontSize: 10,
    color: '#9ca3af'
  },
  navTextActive: {
    fontSize: 10,
    color: '#f97316'
  }
});
