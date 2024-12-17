import { View, Text, ActivityIndicator, FlatList, Image, TouchableOpacity, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './styles'; // Daha önce verdiğiniz stil dosyası
import { kalp, kalpdolu } from '../../assets/icons'; // Beğeni ikonları
import { migros, Misaş, a101, şok } from '../../assets/images'; // Market logoları
import { useFavorites } from '../../contexts/FavoriteContext'; // Beğeni durumu için Context
import { useNavigation } from '@react-navigation/native'; // Navigasyon
import BottomTabs from '../../components/BottomTabs/BottomTabs';

// Market logoları eşleşmesi
const marketLogos = {
  Misaş: Misaş,
  migros: migros,
  a101: a101,
  şok: şok,
};

const AramaSayfasi = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const { likedProducts, toggleLike } = useFavorites(); // Context'ten beğeni durumu
  const navigation = useNavigation();

  // Veri çekme işlemi
  useEffect(() => {
    fetchProducts();
  }, []);

  // Ürünleri API'den çekme
  const fetchProducts = async () => {
    try {
      console.log('Veri çekme işlemi başlıyor...');
      const response = await fetch('http://10.192.112.212:5001/tum_urunler');
      if (!response.ok) {
        throw new Error(`Sunucu hatası: ${response.status}`);
      }
      const data = await response.json();
      console.log('Tüm Veriler:', data);
      setProducts(data);
      setFilteredProducts(data); // İlk başta tüm ürünleri göster
    } catch (error) {
      console.error('Hata oluştu:', error.message);
    } finally {
      setLoading(false);
    }
  };

  // Arama işlemi
  const handleSearch = (text) => {
    setSearchQuery(text);
    const filtered = products.filter((item) =>
      item.urun_adi.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      {/* Arama Çubuğu */}
      <TextInput
        style={[styles.productCard, { marginBottom: 16, padding: 10 }]} // Arama çubuğu için stil
        placeholder="Ürün ara..."
        value={searchQuery}
        onChangeText={handleSearch}
      />

      {/* Ürün Listesi */}
      <FlatList
        data={filteredProducts}
        numColumns={2}
        keyExtractor={(item) => item.urun_adi}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('HomePageDetails', { product: item })}
            style={[styles.productCard, { height: 250, marginRight: 8, width: 150,marginLeft:25 }]}
          >
            <View style={{ position: 'relative' }}>
              {/* Market logosu sol üstte */}
              {marketLogos[item.market] && (
                <Image
                  source={marketLogos[item.market]}
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                    position: 'absolute',
                    top: 5,
                    left: 5,
                    zIndex: 1,
                  }}
                />
              )}
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  right: 5,
                  top: 5,
                  zIndex: 1,
                }}
                onPress={() => toggleLike(item)}
              >
                <Image
                  source={likedProducts.some((prod) => prod.urun_adi === item.urun_adi)
                    ? kalpdolu
                    : kalp}
                  style={{ width: 20, height: 20 }}
                />
              </TouchableOpacity>
              <Image
                style={{ width: 100, height: 100, borderRadius: 10 }}
                source={{ uri: item.resim_linki }}
              />
            </View>
            <Text style={styles.productName}>{item.urun_adi}</Text>
            <Text style={styles.productPrice}>{item.urun_fiyati}</Text>
          </TouchableOpacity>
        )}
      />
      <View style={{ position: 'absolute', bottom: 0, width: '100%' }}>
        <BottomTabs />
      </View>
    </View>
  );
};

export default AramaSayfasi;
