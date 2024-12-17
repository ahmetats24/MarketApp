import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  ImageBackground,
  ScrollView,
} from 'react-native';
import { bluee } from '../../assets/images';
const HomePageDetails = ({ route }) => {
  const { product } = route.params;
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSimilarProducts();
  }, []);

  const normalizeProductName = (name) => {
    try {
      return decodeURIComponent(escape(name))
        .toLowerCase()
        .replace(/[^\w\s]/gi, '')
        .replace(/\s+/g, ' ');
    } catch {
      return name.toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s+/g, ' ');
    }
  };

  const isSimilarProduct = (productName, referenceName) => {
    const normalizedProductName = normalizeProductName(productName);
    const normalizedReferenceName = normalizeProductName(referenceName);

    const regex = new RegExp(normalizedReferenceName.split(' ').join('.*'), 'i');
    return regex.test(normalizedProductName);
  };

  const fetchSimilarProducts = async () => {
    try {
      const response = await fetch('http://10.192.112.212:5001/tum_urunler');
      if (!response.ok) {
        throw new Error(`API Hatası: ${response.status}`);
      }
      const data = await response.json();

      // Diğer marketlerdeki aynı ürünü bulmak için filtreleme
      const filteredProducts = data.filter(
        (item) =>
          isSimilarProduct(item.urun_adi, product.urun_adi) &&
          item.market !== product.market // Farklı marketteki ürünler
      );

      setSimilarProducts(filteredProducts);
    } catch (error) {
      console.error('Hata:', error.message);
      setError('Ürün bilgileri alınırken bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />;
  }

  if (error) {
    return (
      <ImageBackground source={bluee} style={styles.backgroundImage}>
        <View style={styles.container}>
          <Text style={styles.errorMessage}>{error}</Text>
        </View>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground source={bluee} style={styles.backgroundImage}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.mainProductContainer}>
          <Image 
            source={{ uri: product.resim_linki || 'https://via.placeholder.com/200' }} 
            style={styles.mainImage} 
          />
          <Text style={styles.title}>{product.urun_adi}</Text>
          <Text style={styles.price}>En düşük fiyat: {product.urun_fiyati} TL</Text>
          <Text style={styles.market}>Market: {product.market}</Text>
        </View>

        <Text style={styles.sectionTitle}>Diğer Marketlerden Fiyatlar</Text>
        <FlatList
          data={similarProducts}
          keyExtractor={(item, index) => `${item.market}_${index}`}
          renderItem={({ item }) => (
            <View style={styles.relatedItem}>
              <Image 
                source={{ uri: item.resim_linki || 'https://via.placeholder.com/60' }} 
                style={styles.relatedImage} 
              />
              <View>
                <Text style={styles.marketName}>{item.market}</Text>
                <Text style={styles.price}>{item.urun_fiyati} TL</Text>
              </View>
            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.emptyMessage}>
              Bu ürüne ait başka market bulunamadı.
            </Text>
          }
          scrollEnabled={false} // FlatList kendi başına kaydırmayı devre dışı bırakır
        />
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  scrollContainer: {
    padding: 20,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorMessage: {
    fontSize: 18,
    color: '#ff0000',
    textAlign: 'center',
  },
  mainProductContainer: {
    alignItems: 'center',
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#ffffffaa',
    borderRadius: 10,
  },
  mainImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000053',
    textAlign: 'center',
    marginBottom: 10,
  },
  price: {
    fontSize: 20,
    color: '#4CAF50',
    textAlign: 'center',
    marginBottom: 10,
  },
  market: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000053',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  relatedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#ffffffaa',
    padding: 10,
    borderRadius: 10,
  },
  relatedImage: {
    width: 60,
    height: 60,
    marginRight: 10,
    borderRadius: 5,
  },
  marketName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000053',
  },
  emptyMessage: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default HomePageDetails;
