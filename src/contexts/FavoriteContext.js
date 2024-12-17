import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Context oluşturuluyor
const FavoriteContext = createContext();

export const useFavorites = () => {
  return useContext(FavoriteContext);
};

export const FavoriteProvider = ({ children }) => {
  const [likedProducts, setLikedProducts] = useState([]);

  useEffect(() => {
    loadLikedProducts();
  }, []);

  const loadLikedProducts = async () => {
    try {
      const savedLikes = await AsyncStorage.getItem('likedProducts');
      if (savedLikes) {
        setLikedProducts(JSON.parse(savedLikes));
      }
    } catch (error) {
      console.error('Beğenilen ürünler yüklenemedi:', error);
    }
  };

  const toggleLike = async (product) => {
    const updatedLikes = [...likedProducts];
    const productIndex = updatedLikes.findIndex(item => item.urun_adi === product.urun_adi);

    if (productIndex > -1) {
      updatedLikes.splice(productIndex, 1);
    } else {
      updatedLikes.push(product);
    }

    try {
      await AsyncStorage.setItem('likedProducts', JSON.stringify(updatedLikes));
      setLikedProducts(updatedLikes);
    } catch (error) {
      console.error('Beğenilen ürünler kaydedilemedi:', error);
    }
  };

  return (
    <FavoriteContext.Provider value={{ likedProducts, toggleLike }}>
      {children}
    </FavoriteContext.Provider>
  );
};
