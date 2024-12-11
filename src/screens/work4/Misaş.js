import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icecek from '../../components/Icecek/Icecek'; // AburCubur bileşenini import ettik

const App = () => {
  return (
    <View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.title}>İçecekler</Text>
          <TouchableOpacity>
            <Text style={styles.title}>Tümünü Gör</Text>
          </TouchableOpacity>
        </View>
      <Icecek marketName={"Misaş"} productsLimit={10} />
    </View>
  );
};

export default App;
