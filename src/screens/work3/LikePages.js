import { View, Text, ActivityIndicator, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import BottomTabs from '../../components/BottomTabs/BottomTabs';
import AburCubur from '../../components/AburCubur/AburCubur';
import DonukUrun from '../../components/DonukUrun/DonukUrun';
import { kalp, kalpdolu } from '../../assets/icons';
const likePages = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likedProducts, setLikedProducts] = useState({});  // Beğenilen ürünleri takip et

  useEffect(() => {
    fetchAburCubur();
  }, []);

  const fetchAburCubur = async () => {
    try {
      console.log('Veri çekme işlemi başlıyor...');
      const response = await fetch('http://192.168.1.119:5001/icecek');
      if (!response.ok) {
        throw new Error(`Sunucu hatası: ${response.status}`);
      }
      const data = await response.json();
      console.log('Tüm Veriler:', data);
      setProducts(data);

      // En düşük fiyatlı ürünleri filtrele
      const uniqueProducts = findLowestPricedProducts(data);
      setFilteredProducts(uniqueProducts.slice(0, 3)); // Sadece ilk 10 ürünü göster
    } catch (error) {
      console.error('Hata oluştu:', error.message);
    } finally {
      setLoading(false);
    }
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
    <View style={{flex:1}}>
      <View style={{alignItems:"center",marginTop:50}}>
        <Text style={{fontSize:24,fontWeight:"600",color:"black"}}>Beğendiklerim</Text>
      </View>
      <FlatList
      data={filteredProducts}
      numColumns={2}
      keyExtractor={(item) => item.urun_adi}
      renderItem={({ item }) => (
        <TouchableOpacity style={[styles.productCard, { height: 250, marginRight: 8, width: 150, marginTop:25,marginLeft:25 }]}>
          <View style={{ position: 'relative' }}>
            {/* Beğeni simgesi */}
            <TouchableOpacity
              style={{
                right: 5,
                zIndex: 1, 
                marginLeft:100,
                bottom:5
              }}
              onPress={() => toggleLike(item.urun_adi)}
            >
              <Image
                source={likedProducts[item.urun_adi] ? kalpdolu : kalp}
                style={{ width: 20, height: 20 }}
              />
            </TouchableOpacity>
            <Image style={{ width: 100, height: 100, borderRadius: 10 }} source={{ uri: item.resim_linki }} />
          </View>
          <Text style={styles.productName}>{item.urun_adi}</Text>
          <Text style={styles.productPrice}>{item.urun_fiyati} TL</Text>
        </TouchableOpacity>
      )}
    />





      <View style={{position:"absolute", bottom:0}}>
        <BottomTabs/>
      </View>
    </View>
  )
}

export default likePages