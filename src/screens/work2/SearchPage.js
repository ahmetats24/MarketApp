import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
  TextInput,
} from 'react-native';

const Icecek = () => {
  const [drinks, setDrinks] = useState([]); // Tüm içecek verileri
  const [filteredDrinks, setFilteredDrinks] = useState([]); // Filtrelenmiş içecek verileri
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(''); // Arama çubuğu girdisi

  useEffect(() => {
    fetchDrinks();
  }, []);

  useEffect(() => {
    // Arama terimine göre içecekleri filtrele
    const filtered = drinks.filter((item) =>
      item.urun_adi.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDrinks(filtered);
  }, [searchTerm, drinks]);

  const fetchDrinks = async () => {
    try {
      const response = await fetch('http://10.192.112.212:5001/icecek');
      if (!response.ok) {
        throw new Error(`Sunucu hatası: ${response.status}`);
      }
      const data = await response.json();

      // Benzersiz ürünleri filtrele
      const uniqueDrinks = removeDuplicates(data, 'urun_adi');
      setDrinks(uniqueDrinks); // Benzersiz ürünleri kaydet
      setFilteredDrinks(uniqueDrinks); // Başlangıçta tüm benzersiz ürünleri göster
    } catch (error) {
      console.error('Hata oluştu:', error.message);
    } finally {
      setLoading(false);
    }
  };

  // Benzersiz ürünleri filtrelemek için yardımcı fonksiyon
  const removeDuplicates = (data, key) => {
    const seen = new Set();
    return data.filter((item) => {
      const value = item[key];
      if (seen.has(value)) {
        return false; // Daha önce göründüyse çıkar
      }
      seen.add(value);
      return true; // İlk kez göründüyse ekle
    });
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Arama Çubuğu */}
      <TextInput
        style={styles.searchInput}
        placeholder="Ürün ara..."
        value={searchTerm}
        onChangeText={(text) => setSearchTerm(text)} // Arama terimini güncelle
      />
      <FlatList
        data={filteredDrinks}
        keyExtractor={(item) => item.urun_adi}
        numColumns={2} // İki sütunlu düzen
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.resim_linki }} style={styles.image} />
            <Text style={styles.name}>{item.urun_adi}</Text>
            <Text style={styles.price}>{item.urun_fiyati} TL</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  searchInput: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  card: {
    flex: 1,
    margin: 8,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
    elevation: 3,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginBottom: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  price: {
    fontSize: 14,
    color: '#666',
  },
});

export default Icecek;
