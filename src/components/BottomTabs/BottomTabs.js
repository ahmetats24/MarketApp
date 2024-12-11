import { View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { home, setting, search, kalp } from '../../assets/icons';
import styles from './styles';
import { useNavigation, useRoute } from '@react-navigation/native';

const BottomTabs = () => {
  const route = useRoute(); // Mevcut ekranın bilgisini alıyoruz
  const currentRouteName = route.name; // Geçerli ekran ismini alıyoruz

  // Navigasyon işlemleri
  const navigation = useNavigation();

  // Tab'a basıldığında hangi ekrana yönlendirileceğini belirliyoruz
  const handleTabPress = (screen) => {
    navigation.navigate(screen);  // Tıklanan ekrana yönlendiriyoruz
  };

  // Ana sayfa isminin 'Home' olduğundan emin olun
  return (
    <View style={styles.bottomtab}>
      <TouchableOpacity onPress={() => handleTabPress('home')}>
        <Image
          style={[
            styles.resim,
            { tintColor: currentRouteName === 'Home' ? 'blue' : 'gray' }, // Aktif sayfaya mavi renk
          ]}
          source={home}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handleTabPress('search')}>
        <Image
          style={[
            styles.resim,
            { tintColor: currentRouteName === 'Search' ? 'blue' : 'gray' }, // Aktif sayfaya mavi renk
          ]}
          source={search}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handleTabPress('like')}>
        <Image
          style={[
            styles.resim,
            { tintColor: currentRouteName === 'Kalp' ? 'blue' : 'gray' }, // Aktif sayfaya mavi renk
          ]}
          source={kalp}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handleTabPress('Setting')}>
        <Image
          style={[
            styles.resim,
            { tintColor: currentRouteName === 'Setting' ? 'blue' : 'gray' }, // Aktif sayfaya mavi renk
          ]}
          source={setting}
        />
      </TouchableOpacity>
    </View>
  );
};

export default BottomTabs;
