import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { AntDesign, Feather, Entypo } from '@expo/vector-icons';

export default function ProductDetails() {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const description = "Praesent rhoncus, libero vel consectetur egestas, nisl libero rhoncus orci, non maximus justo nunc nec est. Suspendisse potenti....";

  const handleDescriptionToggle = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Top Navigation */}
      <View style={styles.topNav}>
        <AntDesign name="arrowleft" size={24} color="black" />
        <Text style={styles.headerTitle}>Detalhes do produto</Text>
        <Feather name="shopping-cart" size={24} color="black" />
      </View>

      {/* Product Image */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: 'data:image/jpeg;base64,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' }}
          style={styles.productImage}
          resizeMode="contain"
        />
        <Text style={styles.productTitle}>Ração Premium</Text>
      </View>

      {/* Description */}
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionTitle}>Descrição</Text>
        <Text style={styles.descriptionText}>
          {showFullDescription ? description : description.substring(0, 90)}
          <Text style={styles.readMore} onPress={handleDescriptionToggle}>
            {showFullDescription ? ' Ler menos' : ' Ler mais'}
          </Text>
        </Text>

        {/* Rating and Distance */}
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <AntDesign name="star" size={16} color="#FFB800" />
            <Text style={styles.infoText}>4.9</Text>
          </View>
          <View style={styles.infoItem}>
            <Entypo name="location-pin" size={16} color="#FFB800" />
            <Text style={styles.infoText}>190m</Text>
          </View>
        </View>
      </View>

      {/* Price and Button */}
      <View style={styles.footer}>
        <Text style={styles.priceText}>R$ 143,90</Text>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>Adicionar ao carrinho</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  topNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  productImage: {
    width: 180,
    height: 180,
    padding: 8,
  },
  productTitle: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '600',
  },
  descriptionContainer: {
    marginBottom: 16,
  },
  descriptionTitle: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  descriptionText: {
    color: '#777',
  },
  readMore: {
    color: '#007AFF',
    fontWeight: '500',
  },
  infoRow: {
    flexDirection: 'row',
    marginTop: 8,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  infoText: {
    marginLeft: 4,
    color: '#555',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 24,
    marginBottom: 32,
  },
  priceText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF6600',
  },
  addButton: {
    backgroundColor: '#FF9900',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
