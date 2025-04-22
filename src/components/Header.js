import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Header = ({ onMenuPress, onSearchPress, name = 'Misafir', navigation }) => {
  const handleLogout = async () => {
    Alert.alert('Çıkış Yap', 'Çıkış yapmak istediğine emin misin?', [
      { text: 'İptal', style: 'cancel' },
      {
        text: 'Çıkış Yap',
        style: 'destructive',
        onPress: async () => {
          await AsyncStorage.clear();
          navigation.replace('LoginScreen');
        },
      },
    ]);
  };

  return (
    <View>
      {/* Üstteki Beyaz Alan */}
      <View style={styles.topBar}>
        <View style={styles.leftSide}>
          <TouchableOpacity onPress={onMenuPress} style={styles.iconLeft}>
            <Ionicons name="grid-outline" size={24} color="#6c63ff" />
          </TouchableOpacity>

          <Text style={styles.helloBar}>
            Hoş geldin, <Text style={styles.nameBar}>{name}</Text> 👋
          </Text>
        </View>

        <TouchableOpacity onPress={handleLogout} style={styles.iconRight}>
          <Ionicons name="log-out-outline" size={24} color="#ff4d4d" />
        </TouchableOpacity>
      </View>

      {/* Altındaki Sarı Alan */}
      <View style={styles.header}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Yapay Zekayla kendi Masalını Oluştur!</Text>

          <TouchableOpacity style={styles.button}
          onPress={() => navigation.navigate('MasalGeneratePage')}>
            <Text style={styles.buttonText}>Başla</Text>
          </TouchableOpacity>
        </View>

        <Image
          source={require('../assets/images/star.png')}
          style={styles.starImage}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topBar: {
    backgroundColor: '#fff',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 2,
    marginTop: 30,
  },
  leftSide: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconLeft: {
    padding: 5,
  },
  helloBar: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'ms-regular',
    marginLeft: 10,
  },
  nameBar: {
    fontFamily: 'ms-bold',
    color: '#6c63ff',
  },
  iconRight: {
    padding: 5,
  },
  header: {
    backgroundColor: '#FFA500',
    borderRadius: 18,
    padding: 35,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin:5
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
  },
  title: {
    color: '#fff',
    fontSize: 27,
    fontFamily: 'ms-bold',
    marginBottom: 10,
    maxWidth: 250,
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 35,
    borderRadius: 15,
    alignSelf: 'flex-start',
    bottom: -20,
  },
  buttonText: {
    color: '#6c63ff',
    fontSize: 16,
    fontFamily: 'ms-bold',
  },
  starImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    position: 'absolute',
    right: -30,
    bottom: 25,
  },
});

export default Header;
