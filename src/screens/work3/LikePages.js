import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // AsyncStorage'ı import et
import styles from './styles';
import { kalp, kalpdolu } from '../../assets/icons'; // Beğeni ikonları
import { migros, Misaş, a101, şok } from '../../assets/images'; // Market logoları
import BottomTabs from '../../components/BottomTabs/BottomTabs';
import { useNavigation } from '@react-navigation/native'; // Navigasyon

// Market logoları eşleşmesi
const marketLogos = {
  Misaş: Misaş,
  migros: migros,
  a101: a101,
  şok: şok,
};

const LikePages = () => {
  const [likedProducts, setLikedProducts] = useState([]);  // Beğenilen ürünler için state
  const navigation = useNavigation();

  useEffect(() => {
    // Uygulama açıldığında AsyncStorage'dan beğenilen ürünleri yükle
    loadLikedProducts();
  }, []);

  const loadLikedProducts = async () => {
    try {
      // AsyncStorage'dan verileri al
      const savedLikes = await AsyncStorage.getItem('likedProducts');
      if (savedLikes) {
        // Verileri alıp state'e aktar
        setLikedProducts(JSON.parse(savedLikes));
      }
    } catch (error) {
      console.error('Beğenilen ürünler yüklenemedi:', error);
    }
  };

  const toggleLike = async (product) => {
    const updatedLikes = [...likedProducts];
    const productIndex = updatedLikes.findIndex(item => item.urun_adi === product.urun_adi);

    if (productIndex > -1) {
      // Ürün zaten beğenilmiş, o zaman beğeniyi kaldır
      updatedLikes.splice(productIndex, 1);
    } else {
      // Ürün henüz beğenilmemiş, beğeniyi ekle
      updatedLikes.push(product);
    }

    // Yeni beğenilen ürünleri AsyncStorage'a kaydet
    try {
      await AsyncStorage.setItem('likedProducts', JSON.stringify(updatedLikes));
      setLikedProducts(updatedLikes);  // State'i güncelle
    } catch (error) {
      console.error('Beğenilen ürünler kaydedilemedi:', error);
    }
  };

  if (likedProducts.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Henüz beğenilen bir ürün yok!</Text>
      </View>
    );
  }

  return (
    <View style={{flex:1}}>
        <FlatList
        style={{marginBottom:75}}
        data={likedProducts}
        keyExtractor={(item) => item.urun_adi}
        numColumns={2} 
        renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('HomePageDetails', { product: item })} style={[styles.productCard, { height: 250, margin: 8, width: 150,marginLeft:35}]}>
            <View style={{ position: 'relative' }}>
                
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
                {/* Beğeni butonu */}
                <TouchableOpacity
                style={{
                    position: 'absolute',
                    right: 5,
                    top: 5,
                    zIndex: 1,
                }}
                onPress={() => toggleLike(item)} // Beğeniyi tersine çevir
                >
                <Image
                    source={kalpdolu} // Beğenilen sayfası olduğu için dolu kalp göster
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
        <View style={{ position: 'absolute', bottom:0,marginTop:100}}>
            <BottomTabs />
        </View>
    </View>
    
  );
};

export default LikePages;
