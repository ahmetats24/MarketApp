import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { HomePage,LikePages, SearchPage, Migros, Misaş, A101, Sok } from '../screens';
const Stack = createNativeStackNavigator();

const MyStack = () => {
    return (
        <Stack.Navigator
          initialRouteName="home"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="home" component={HomePage} />
          <Stack.Screen name="like" component={LikePages} />
          <Stack.Screen name="search" component={SearchPage} />
          <Stack.Screen options={{title:"Migros",headerShown: true}} name="migros" component={Migros} />
          <Stack.Screen options={{title:"Misaş",headerShown: true}} name="misaş" component={Misaş} />
          <Stack.Screen options={{title:"A101",headerShown: true}} name="a101" component={A101} />
          <Stack.Screen options={{title:"Şok",headerShown: true}} name="şok" component={Sok} />
        </Stack.Navigator>
      );
};
export default MyStack;
