import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, ImageBackground, TouchableOpacity } from 'react-native';
import { bluee } from '../../assets/images';

const Page2 = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    if (trimmedUsername === 'admin' && trimmedPassword === '12345') {
      //Alert.alert('Başarılı', 'Giriş başarılı!');
      navigation.navigate('home');
    } else {
      Alert.alert('Hata', 'Kullanıcı adı veya şifre yanlış!');
    }
  };

  return (
    <ImageBackground source={bluee} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.title}>EL AKÇE</Text>
        <TextInput
          style={styles.input}
          placeholder="Kullanıcı Adı"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Şifre"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>Giriş Yap</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate('kayit')}>
          <Text style={styles.registerButtonText}>Kayıt Ol</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // Görüntüyü kapsayacak şekilde boyutlandırır
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 46,
    marginBottom: 15,
    color: "#000053",
    fontFamily: 'Roboto-Italic',
    fontStyle: 'italic',
    fontWeight: "600",
  },
  input: {
    width: '80%',
    height: 50,
    borderColor: 'white',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 5,
    backgroundColor: '#ffffffaa', // Arka plan resminin üzerinde okunabilirlik için
  },
  loginButton: {
    backgroundColor: '#000053', // Mavi tonlu bir arka plan
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 10,
    width: '80%',
    alignItems: 'center',
  },
  registerButton: {
    backgroundColor: '#ffffff', // Beyaz arka plan
    borderColor: '#000053', // Mavi kenarlık
    borderWidth: 2,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff', // Beyaz yazı rengi
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerButtonText: {
    color: '#000053', // Mavi yazı rengi
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Page2;