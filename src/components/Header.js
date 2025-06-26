import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const windowWidth = Dimensions.get('window').width;

const Header = ({ onMenuPress, onSearchPress, name = 'Misafir', navigation }) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

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

  const handleMenuItemPress = (action) => {
    setMenuVisible(false);
    if (action === 'profile') {
      navigation.navigate('HomeStack', { screen: 'ProfilePage' });
    } else if (action === 'myStories') {
      navigation.navigate('HomeStack', { screen: 'MyStoriesPage' });
    } else if (action === 'help') {
      Alert.alert('Yardım', 'Yardım sayfası yakında!');
    } else if (action === 'logout') {
      handleLogout();
    }
  };

  return (
    <View>
      {/* Üstteki Beyaz Alan */}
      <View style={styles.topBar}>
        <View style={styles.leftSide}>
          <TouchableOpacity onPress={toggleMenu} style={styles.iconLeft}>
            <Ionicons name="grid-outline" size={24} color="#6c63ff" />
          </TouchableOpacity>

          <Text style={styles.helloBar}>
            Hoş geldin, <Text style={styles.nameBar}>{name}</Text> 👋
          </Text>
        </View>
      </View>

      {/* Menü */}
      {menuVisible && (
        <View style={styles.menuContainer}>
          <TouchableOpacity
            onPress={() => handleMenuItemPress('profile')}
            style={styles.menuItemTouchable}
          >
            <View style={styles.menuItemRow}>
              <Ionicons
                name="person-outline"
                size={18}
                color="#6c63ff"
                style={styles.menuIcon}
              />
              <Text style={styles.menuItem}>Profil</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity
            onPress={() => handleMenuItemPress('myStories')}
            style={styles.menuItemTouchable}
          >
            <View style={styles.menuItemRow}>
              <Ionicons
                name="book-outline"
                size={18}
                color="#6c63ff"
                style={styles.menuIcon}
              />
              <Text style={styles.menuItem}>Masallarım</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.divider} />
          <TouchableOpacity
            onPress={() => handleMenuItemPress('logout')}
            style={[styles.menuItemTouchable, styles.logoutButton]}
          >
            <View style={styles.menuItemRow}>
              <Ionicons
                name="log-out-outline"
                size={18}
                color="#ff4d4d"
                style={styles.menuIcon}
              />
              <Text style={[styles.menuItem, styles.logoutText]}>Çıkış Yap</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}

      {/* Altındaki Sarı Alan */}
      <View style={[styles.header, { padding: windowWidth * 0.07 }]}>
        <View style={[styles.textContainer, { maxWidth: windowWidth * 0.55 }]}>
          <Text style={styles.title}>Yapay Zekayla kendi Masalını Oluştur!</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Masal Oluştur')}
          >
            <Text style={styles.buttonText}>Başla</Text>
          </TouchableOpacity>
        </View>

        <Image
          source={require('../assets/images/star.png')}
          style={[
            styles.starImage,
            {
              width: windowWidth * 0.4,
              height: windowWidth * 0.4,
              right: -windowWidth * 0.07,
            },
          ]}
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
    marginTop: 50,
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
  header: {
    backgroundColor: '#FFA500',
    borderRadius: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 5,
    position: 'relative',
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
  },
  title: {
    color: '#fff',
    fontSize: 25,
    fontFamily: 'ms-bold',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 35,
    borderRadius: 15,
    alignSelf: 'flex-start',
    bottom: 0,
  },
  buttonText: {
    color: '#6c63ff',
    fontSize: 16,
    fontFamily: 'ms-bold',
  },
  starImage: {
    position: 'absolute',
    bottom: 30,
    resizeMode: 'contain',
    left: 200,
  },

  // Menü stilleri
  menuContainer: {
    position: 'absolute',
    top: 110,
    left: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    height:180,
    width:180,
    zIndex: 999,
  },
  menuItemTouchable: {
    paddingVertical: 8,
  },
  menuItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',  // Sola hizalama
    
  },
  menuIcon: {
    marginRight: 10,
  },
  menuItem: {
    fontSize: 14,
    fontFamily: 'ms-regular',
    color: '#333',
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 5,
  },
  logoutButton: {
    marginTop: 30,
  },
  logoutText: {
    color: '#ff4d4d',
    fontWeight: 'bold',
  },
});

export default Header;
