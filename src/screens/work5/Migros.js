import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Icecek from '../../components/Icecek/Icecek'; // AburCubur bileşenini import ettik
import AburCubur from '../../components/AburCubur/AburCubur';
import DonukUrun from '../../components/DonukUrun/DonukUrun';
import Etbalık from '../../components/Etbalık/Etbalık';

const Migros = ({navigation}) => {
  return (
    <ScrollView>
       <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.title}>Abur Cubur</Text>
          <TouchableOpacity onPress={()=>navigation.navigate("aburcuburall",{ marketadi: "migros" }) }>
            <Text style={styles.title}>Tümünü Gör</Text>
          </TouchableOpacity>
        </View>
        <View>
          <AburCubur marketName={"migros"} productsLimit={10} horizontal={true}  />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.title}>İçecekler</Text>
          <TouchableOpacity onPress={()=>navigation.navigate("icecekall",{ marketadi: "migros" }) }>
            <Text style={styles.title}>Tümünü Gör</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Icecek marketName={"migros"} productsLimit={10} horizontal={true} />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.title}>Donuk Ürünler</Text>
          <TouchableOpacity onPress={()=>navigation.navigate("donukurunall",{ marketadi: "migros" }) }> 
            <Text style={styles.title}>Tümünü Gör</Text>
          </TouchableOpacity>
        </View>
        <View>
          <DonukUrun marketName={"migros"} productsLimit={10} horizontal={true} />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.title}>Et Tavuk Balık</Text>
          <TouchableOpacity onPress={()=>navigation.navigate("etbalıkall",{ marketadi: "migros" }) }>
            <Text style={styles.title}>Tümünü Gör</Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginBottom: 80 }}>
          <Etbalık marketName={"migros"} productsLimit={10} horizontal={true} />
        </View>
    </ScrollView>
  );
};

export default Migros;
