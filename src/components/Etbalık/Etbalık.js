import { View, Text, ActivityIndicator, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './styles';
import { kalp, kalpdolu } from '../../assets/icons';  // Dolu kalp simgesi
import { migros, Misaş, a101, şok } from '../../assets/images'; // Market resimleri

// Market logosu eşleşmesi
const marketLogos = {
  Misaş: Misaş,
  migros: migros,
  a101: a101,
  şok: şok,
};

const Etbalık = ({ marketName, productsLimit }) => {  // productsLimit prop'u eklendi
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likedProducts, setLikedProducts] = useState({});  // Beğenilen ürünleri takip et

  useEffect(() => {
    fetchIcecek();
  }, [marketName, productsLimit]);  // marketName veya productsLimit değiştiğinde veri çekilecek

  const fetchIcecek = async () => {
    try {
      console.log('Veri çekme işlemi başlıyor...');
      const response = await fetch('http://10.192.112.212:5001/et_tavuk_balık');
      if (!response.ok) {
        throw new Error(`Sunucu hatası: ${response.status}`);
      }
      const data = await response.json();
      console.log('Tüm Veriler:', data);
      setProducts(data);

      // Market adına göre filtreleme
      const filteredByMarket = marketName
        ? data.filter(item => item.market === marketName)  // Sadece belirli marketin ürünlerini al
        : data; // Eğer marketName yoksa tüm verileri al

      // Rastgele sıralama
      const shuffledProducts = shuffleArray(filteredByMarket);
      // En düşük fiyatlı ürünleri filtrele
      const uniqueProducts = findLowestPricedProducts(shuffledProducts);
      setFilteredProducts(uniqueProducts.slice(0, productsLimit)); // Ürün sayısını productsLimit'e göre sınırlıyoruz
    } catch (error) {
      console.error('Hata oluştu:', error.message);
      Alert.alert('Hata', 'Veri çekme işlemi sırasında bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  const shuffleArray = (array) => {
    // Array'i rastgele sıralamak için Fisher-Yates algoritması
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const findLowestPricedProducts = (products) => {
    const productMap = {};
    products.forEach((product) => {
      const { urun_adi, urun_fiyati, market, resim_linki } = product;
      const price = parseFloat(urun_fiyati.replace(',', '.'));

      if (!productMap[urun_adi] || productMap[urun_adi].price > price) {
        productMap[urun_adi] = { urun_adi, urun_fiyati, market, resim_linki, price };
      }
    });
    return Object.values(productMap);
  };

  const toggleLike = (urun_adi) => {
    setLikedProducts((prevState) => ({
      ...prevState,
      [urun_adi]: !prevState[urun_adi], // Beğeni durumu tersine çevir
    }));
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <FlatList
      data={filteredProducts}
      keyExtractor={(item) => item.urun_adi}
      horizontal={true}
      renderItem={({ item }) => (
        <TouchableOpacity style={[styles.productCard, { height: 250, marginRight: 8, width: 150 }]}>
          <View style={{ position: 'relative' }}>
            {/* Market logosu sol üstte */}
            {marketLogos[item.market] && (
              <Image
                source={marketLogos[item.market]}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 15
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
              onPress={() => toggleLike(item.urun_adi)}
            >
              <Image
                source={likedProducts[item.urun_adi] ? kalpdolu : kalp}
                style={{ width: 20, height: 20 }}
              />
            </TouchableOpacity>

            {/* Ürün resmi */}
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
  );
};

export default Etbalık;
