import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './Navigation';
import { FavoriteProvider } from '../contexts/FavoriteContext';

const App = () => {
  return (
    <FavoriteProvider>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </FavoriteProvider>
  );
};

export default App;
