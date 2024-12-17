import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import styles from './styles';
import { Misaş, migros, a101, şok } from '../../assets/images'; // Resimlerinizi buraya import edin
import AburCubur from '../../components/AburCubur/AburCubur';
import Icecek from '../../components/Icecek/Icecek';
import DonukUrun from '../../components/DonukUrun/DonukUrun';
import Etbalık from '../../components/Etbalık/Etbalık';
import BottomTabs from '../../components/BottomTabs/BottomTabs';

const HomePage = ({ navigation }) => {

  // JSON verisi
  const productData = [
    {
      "Market": "Misaş",
      "Ürün Adı": "Cola Turka Pet 2.5lt",
      "Resim Linki": "https://misassanalmarket.com/218885-home_default/cola-turka-pet-25lt.jpg",
      "urun_fiyati": "₺39,95",
      "İlk Fiyat": "₺39.95",
      "İndirim Miktarı": "₺1.35",
      "Son Fiyat": "₺38.6",
      "İndirim Oranı (%)": 3.38
    },
    {
      "Market": "a101",
      "Ürün Adı": "Coca Cola 330 Ml",
      "Resim Linki": "https://cdn2.a101.com.tr/dbmk89vnr/CALL/Image/get/9bD5NoFuaZ_256x256.png",
      "urun_fiyati": "₺30,00",
      "İlk Fiyat": "₺30.0",
      "İndirim Miktarı": "₺1.04",
      "Son Fiyat": "₺28.96",
      "İndirim Oranı (%)": 3.47
    },
    {
      "Market": "Misaş",
      "Ürün Adı": "Şölen Ozmo Cornet Sütlü 25gr",
      "Resim Linki": "https://misassanalmarket.com/219083-home_default/solen-ozmo-cornet-sutlu-25gr.jpg",
      "urun_fiyati": "₺15,50",
      "İlk Fiyat": "₺15.5",
      "İndirim Miktarı": "₺1.2",
      "Son Fiyat": "₺14.3",
      "İndirim Oranı (%)": 7.74
    }
  ];

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.baslık_konum}>
          <View style={styles.baslık_konum}>
            <Text style={styles.baslık}>ElAkçe</Text>
          </View>
          <View style={styles.kullanici}>
            <Text style={styles.kullaniciadi}>AA</Text>
          </View>
        </View>
        <ScrollView horizontal={true} style={styles.marketKonum}>
          <TouchableOpacity onPress={() => navigation.navigate("misaş")}>
            <Image style={styles.market} source={Misaş} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("migros")}>
            <Image style={styles.market} source={migros} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("a101")}>
            <Image style={styles.market} source={a101} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("şok")}>
            <Image style={styles.market} source={şok} />
          </TouchableOpacity>
        </ScrollView>

        <View style={styles.ürünyazi}>
          <Text style={styles.ürüntext}>En Ucuz Ürünler</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, alignItems: "center" }}>
          <Text style={styles.title}>Abur Cubur</Text>
          <TouchableOpacity style={styles.allseebutton} onPress={() => navigation.navigate("aburcuburall")}>
            <Text style={styles.allsee}>Tümünü Gör</Text>
          </TouchableOpacity>
        </View>
        <View>
          <AburCubur productsLimit={10} horizontal={true} sayısı={1} />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, alignItems: "center" }}>
          <Text style={styles.title}>İçecekler</Text>
          <TouchableOpacity style={styles.allseebutton} onPress={() => navigation.navigate("icecekall")}>
            <Text style={styles.allsee}>Tümünü Gör</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Icecek productsLimit={10} horizontal={true} sayısı={1} />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, alignItems: "center" }}>
          <Text style={styles.title}>Donuk Ürünler</Text>
          <TouchableOpacity style={styles.allseebutton} onPress={() => navigation.navigate("donukurunall")}>
            <Text style={styles.allsee}>Tümünü Gör</Text>
          </TouchableOpacity>
        </View>
        <View>
          <DonukUrun productsLimit={10} horizontal={true} sayısı={1} />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, alignItems: "center" }}>
          <Text style={styles.title}>Et Tavuk Balık</Text>
          <TouchableOpacity style={styles.allseebutton} onPress={() => navigation.navigate("etbalıkall")}>
            <Text style={styles.allsee}>Tümünü Gör</Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginBottom: 10 }}>
          <Etbalık productsLimit={10} horizontal={true} sayısı={1} />
        </View>
        <View style={styles.discountPanel}>
          <Text style={styles.discountPanelTitle}>İndirimli Ürünler</Text>
          {productData.map((product, index) => (
            <View key={index} style={styles.discountItem}>
              <Image source={{ uri: product["Resim Linki"] }} style={styles.discountImage} />
              <View style={styles.discountInfo}>
                <Text style={styles.discountName}>{product["Ürün Adı"]}</Text>
                <Text style={styles.discountPrice}>İndirimli Fiyat: {product["Son Fiyat"]}₺</Text>
                <Text style={styles.discountPercentage}>İndirim: {product["İndirim Oranı (%)"]}%</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      
      <View style={{ position: 'absolute', bottom: 0, width: '100%' }}>
        <BottomTabs />
      </View>
    </View>
  );
};



export default HomePage;
