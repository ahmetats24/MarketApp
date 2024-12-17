import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ImageBackground,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import { bluee } from '../../assets/images';

const Page1 = ({navigation}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    if (!firstName || !lastName || !email || !password) {
      Alert.alert('Hata', 'Tüm alanları doldurun!');
      return;
    }

    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        const currentUser = auth().currentUser;

        if (currentUser) {
          currentUser
            .updateProfile({
              displayName: "${firstName} ${lastName}",
            })
            .then(() => {
              Alert.alert('Başarılı', 'Kayıt başarıyla tamamlandı!');
            })
            .catch(() => {
              Alert.alert(
                'Hata',
                'Kullanıcı bilgileri güncellenirken bir hata oluştu!'
              );
            });
        }
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert('Hata', 'Bu e-posta adresi zaten kullanılıyor!');
        } else if (error.code === 'auth/invalid-email') {
          Alert.alert('Hata', 'Geçersiz e-posta adresi!');
        } else if (error.code === 'auth/weak-password') {
          Alert.alert('Hata', 'Şifre çok zayıf!');
        } else {
          Alert.alert('Hata', 'Bir sorun oluştu!');
        }
      });
  };

  return (
    <ImageBackground source={bluee} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.title}>Kayıt Ol</Text>

        <TextInput
          placeholder="İsim"
          value={firstName}
          onChangeText={setFirstName}
          style={styles.input}
        />

        <TextInput
          placeholder="Soyisim"
          value={lastName}
          onChangeText={setLastName}
          style={styles.input}
        />

        <TextInput
          placeholder="E-posta"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
        />

        <TextInput
          placeholder="Şifre"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Kayıt Ol</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.registerButton} onPress={()=>navigation.navigate("giris") }>
          <Text style={styles.registerButtonText}>Giriş Yap</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // Arka plan resmi boyutlandırma
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 40,
    color: '#000053',
    fontFamily: 'Roboto-Italic',
    fontStyle: 'italic',
    fontWeight: '600',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 50,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#ffffffaa', // Arka planla kontrast için yarı saydam
  },
  button: {
    backgroundColor: '#000053',
    width: '80%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
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
  registerButtonText: {
    color: '#000053', // Mavi yazı rengi
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Page1;