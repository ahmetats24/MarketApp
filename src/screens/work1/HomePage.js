import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import styles from './styles';
import { Misaş, migros, a101, şok } from '../../assets/images';
import AburCubur from '../../components/AburCubur/AburCubur';
import Icecek from '../../components/Icecek/Icecek';
import DonukUrun from '../../components/DonukUrun/DonukUrun';
import Etbalık from '../../components/Etbalık/Etbalık';
import BottomTabs from '../../components/BottomTabs/BottomTabs';

const HomePage = ({navigation}) => {
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
          <TouchableOpacity onPress={()=>navigation.navigate("misaş")}>
            <Image style={styles.market} source={Misaş} />
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>navigation.navigate("migros")}>
            <Image style={styles.market} source={migros} />
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>navigation.navigate("a101")}>
            <Image style={styles.market} source={a101} />
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>navigation.navigate("şok")}>
            <Image style={styles.market} source={şok} />
          </TouchableOpacity>
        </ScrollView>
        <View style={styles.ürünyazi}>
          <Text style={styles.ürüntext}>En Ucuz Ürünler</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.title}>Abur Cubur</Text>
          <TouchableOpacity>
            <Text style={styles.title}>Tümünü Gör</Text>
          </TouchableOpacity>
        </View>
        <View>
          <AburCubur productsLimit={10} />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.title}>İçecekler</Text>
          <TouchableOpacity>
            <Text style={styles.title}>Tümünü Gör</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Icecek productsLimit={10} />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.title}>Donuk Ürünler</Text>
          <TouchableOpacity>
            <Text style={styles.title}>Tümünü Gör</Text>
          </TouchableOpacity>
        </View>
        <View>
          <DonukUrun productsLimit={10} />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.title}>Et Tavuk Balık</Text>
          <TouchableOpacity>
            <Text style={styles.title}>Tümünü Gör</Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginBottom: 80 }}>
          <Etbalık productsLimit={10} />
        </View>
      </ScrollView>
      <View style={{ position: 'absolute', bottom: 0, width: '100%' }}>
        <BottomTabs />
      </View>
    </View>
  );
};

export default HomePage;
