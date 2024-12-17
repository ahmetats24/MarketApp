import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Icecek from '../../components/Icecek/Icecek'; // AburCubur bileşenini import ettik
import AburCubur from '../../components/AburCubur/AburCubur';
import DonukUrun from '../../components/DonukUrun/DonukUrun';
import Etbalık from '../../components/Etbalık/Etbalık';

const Sok = ({navigation}) => {
  return (
    <ScrollView>
       <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.title}>Abur Cubur</Text>
          <TouchableOpacity onPress={()=>navigation.navigate("aburcuburall",{ marketadi: "şok" }) }>
            <Text style={styles.title}>Tümünü Gör</Text>
          </TouchableOpacity>
        </View>
        <View>
          <AburCubur marketName={"şok"} productsLimit={10} horizontal={true}  />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.title}>İçecekler</Text>
          <TouchableOpacity onPress={()=>navigation.navigate("icecekall",{ marketadi: "şok" }) }>
            <Text style={styles.title}>Tümünü Gör</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Icecek marketName={"şok"} productsLimit={10} horizontal={true} />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.title}>Donuk Ürünler</Text>
          <TouchableOpacity onPress={()=>navigation.navigate("donukurunall",{ marketadi: "şok" }) }> 
            <Text style={styles.title}>Tümünü Gör</Text>
          </TouchableOpacity>
        </View>
        <View>
          <DonukUrun marketName={"şok"} productsLimit={10} horizontal={true} />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.title}>Et Tavuk Balık</Text>
          <TouchableOpacity onPress={()=>navigation.navigate("etbalıkall",{ marketadi: "şok" }) }>
            <Text style={styles.title}>Tümünü Gör</Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginBottom: 80 }}>
          <Etbalık marketName={"şok"} productsLimit={10} horizontal={true} />
        </View>
    </ScrollView>
  );
};

export default Sok;
