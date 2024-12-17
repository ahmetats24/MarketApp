import { View, Text, ActivityIndicator, FlatList, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './styles';
import { kalp, kalpdolu } from '../../assets/icons'; // Beğeni ikonları
import { migros, Misaş, a101, şok } from '../../assets/images'; // Market logoları
import { useFavorites } from '../../contexts/FavoriteContext'; // Beğeni durumu için Context
import { useNavigation } from '@react-navigation/native'; // Navigasyon

// Market logoları eşleşmesi
const marketLogos = {
  Misaş: Misaş,
  migros: migros,
  a101: a101,
  şok: şok,
};

const AburCubur = ({ marketName, productsLimit, horizontal, sayısı, solabosluk }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { likedProducts, toggleLike } = useFavorites(); // Context'ten beğeni durumu
  const navigation = useNavigation();
  
  useEffect(() => {
    fetchIcecek();
  }, [marketName, productsLimit]);

  const fetchIcecek = async () => {
    try {
      console.log('Veri çekme işlemi başlıyor...');
      const response = await fetch('http://10.192.112.212:5001/donuk_ürünler');
      if (!response.ok) {
        throw new Error(`Sunucu hatası: ${response.status}`);
      }
      const data = await response.json();
      console.log('Tüm Veriler:', data);
      setProducts(data);

      // Market adına göre filtreleme
      const filteredByMarket = marketName
        ? data.filter((item) => item.market === marketName || item.urun_adi.toLowerCase().includes(marketName.toLowerCase())) // marketName arama ile
        : data;

      // Rastgele sıralama ve en düşük fiyatlı ürünleri bulma
      const shuffledProducts = shuffleArray(filteredByMarket);
      const uniqueProducts = findLowestPricedProducts(shuffledProducts);
      setFilteredProducts(uniqueProducts.slice(0, productsLimit));
    } catch (error) {
      console.error('Hata oluştu:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const shuffleArray = (array) => {
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

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <FlatList
      data={filteredProducts}
      keyExtractor={(item) => item.urun_adi}
      horizontal={horizontal}
      numColumns={sayısı}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('HomePageDetails', { product: item })} style={[styles.productCard, { height: 250, marginRight: 8, width: 150, marginLeft: solabosluk }]}>
          <View style={{ position: 'relative' }}>
            {/* Market logosu sol üstte */}
            {marketLogos[item.market] && (
              <Image
                source={marketLogos[item.market]}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 15,
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
  );
};

export default AburCubur;
