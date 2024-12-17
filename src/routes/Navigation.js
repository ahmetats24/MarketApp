import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { HomePage,LikePages, SearchPage, Migros, Misaş, A101, Sok, AburcuburAll, IcecekAll, EtbalıkAll, DonukurunAll, Page1,Page2, HomePageDetails  } from '../screens';
const Stack = createNativeStackNavigator();

const MyStack = () => {
    return (
        <Stack.Navigator
          initialRouteName="giris"
          screenOptions={{headerShown: false}}>
            <Stack.Screen name="kayit" component={Page1}/>
            <Stack.Screen name="giris" component={Page2}/>
          <Stack.Screen name="home" component={HomePage} />
          <Stack.Screen name="like" component={LikePages} />
          <Stack.Screen name="search" component={SearchPage} />
          <Stack.Screen options={{title:"Migros",headerShown: true}} name="migros" component={Migros} />
          <Stack.Screen options={{title:"Misaş",headerShown: true}} name="misaş" component={Misaş} />
          <Stack.Screen options={{title:"A101",headerShown: true}} name="a101" component={A101} />
          <Stack.Screen options={{title:"Şok",headerShown: true}} name="şok" component={Sok} />
          <Stack.Screen options={{title:"Abur Cubur",headerShown: true}} name="aburcuburall" component={AburcuburAll} />
          <Stack.Screen options={{title:"İçecekler",headerShown: true}} name="icecekall" component={IcecekAll} />
          <Stack.Screen options={{title:"Et Balık Tavuk",headerShown: true}} name="etbalıkall" component={EtbalıkAll} />
          <Stack.Screen options={{title:"Donuk Ürünler",headerShown: true}} name="donukurunall" component={DonukurunAll} />
          <Stack.Screen options={{title:"Ürün Detayları",headerShown: true}} name="HomePageDetails" component={HomePageDetails} />
        </Stack.Navigator>
      );
};
export default MyStack;
