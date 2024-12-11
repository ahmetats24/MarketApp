import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, Button, StyleSheet, ScrollView, Image } from 'react-native';

const App = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://192.168.1.119:5001/icecek');
      if (!response.ok) {
        throw new Error(`Sunucu hatası: ${response.status}`);
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Hata oluştu:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    const filtered = products.filter((item) =>
      item.urun_adi.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // 4 markette de mevcut olan ürünleri filtrele
    const availableInAllMarkets = filtered.filter(
      (item) => item.market === 'Misaş' || item.market === 'Migros' || item.market === 'A101' || item.market === 'Şok'
    );

    setFilteredProducts(availableInAllMarkets);
  };

  const findCheapestProduct = () => {
    if (filteredProducts.length === 0) return null;

    const cheapestProduct = filteredProducts.reduce((prev, current) =>
      parseFloat(prev.urun_fiyati.replace(',', '.')) < parseFloat(current.urun_fiyati.replace(',', '.')) ? prev : current
    );

    const others = filteredProducts.filter((item) => item !== cheapestProduct);

    return { cheapest: cheapestProduct, others };
  };

  if (loading) {
    return <Text>Yükleniyor...</Text>;
  }

  const { cheapest, others } = findCheapestProduct() || {};

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Ürün Arama</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Ürün adını girin..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <Button title="Ara" onPress={handleSearch} />

      {cheapest ? (
        <>
          <Text style={styles.productTitle}>Ürün Karşılaştırması</Text>
          
          {/* En ucuz fiyat */}
          <View style={styles.cheapestContainer}>
            <Text style={styles.marketName}>En Ucuz: {cheapest.market}</Text>
            <Image source={{ uri: cheapest.resim_linki }} style={styles.productImage} />
            <Text style={styles.marketPrice}>{cheapest.urun_fiyati} TL</Text>
          </View>

          {/* Diğer marketlerin fiyatları */}
          {others && (
            <View>
              <Text style={styles.otherMarketsTitle}>Diğer Marketlerdeki Fiyatlar:</Text>
              <FlatList
                data={others}
                keyExtractor={(item) => item.urun_adi + item.market} // Benzersiz bir anahtar
                renderItem={({ item }) => (
                  <View style={styles.otherMarket}>
                    <Text style={styles.marketName}>{item.market}</Text>
                    <Image source={{ uri: item.resim_linki }} style={styles.productImage} />
                    <Text style={styles.marketPrice}>{item.urun_fiyati} TL</Text>
                  </View>
                )}
              />
            </View>
          )}
        </>
      ) : (
        <Text>Aradığınız ürünü bulamadık.</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 8,
    marginBottom: 20,
  },
  productTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  cheapestContainer: {
    backgroundColor: '#d4edda',
    padding: 10,
    marginBottom: 20,
  },
  marketName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  marketPrice: {
    fontSize: 16,
  },
  otherMarketsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  otherMarket: {
    backgroundColor: '#f8f9fa',
    padding: 10,
    marginBottom: 10,
  },
  productImage: {
    width: 100,
    height: 100,
    marginVertical: 10,
    resizeMode: 'contain',
  },
});

export default App;
