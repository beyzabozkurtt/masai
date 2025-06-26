import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

export default function ProfilePage({ navigation }) {
  const [user, setUser] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      loadUserData();
    }
  }, [isFocused]);

  const loadUserData = async () => {
    try {
      setLoading(true);
      const name = await AsyncStorage.getItem('name');
      const email = await AsyncStorage.getItem('email');
      setUser({ name: name || 'Bilinmiyor', email: email || '-' });
    } catch (error) {
      console.error('❌ Kullanıcı bilgileri alınamadı:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    Alert.alert('Çıkış Yap', 'Hesabınızdan çıkmak istiyor musunuz?', [
      { text: 'İptal', style: 'cancel' },
      {
        text: 'Evet',
        onPress: async () => {
          await AsyncStorage.clear();
          navigation.replace('LoginScreen');
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Profil</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#6c63ff" />
      ) : (
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Feather name="user" size={36} color="#fff" />
          </View>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.email}>{user.email}</Text>
        </View>
      )}

      <View style={styles.buttonGroup}>
        <TouchableOpacity
          style={[styles.button, styles.primaryButton]}
          onPress={() => navigation.navigate('HomeStack', { screen: 'MyStoriesPage' })}
        >
          <Feather name="book" size={18} color="#fff" style={styles.iconLeft} />
          <Text style={styles.buttonText}>Benim Masallarım</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.logoutButton]}
          onPress={handleLogout}
        >
          <Feather name="log-out" size={18} color="#fff" style={styles.iconLeft} />
          <Text style={styles.buttonText}>Çıkış Yap</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    padding: 20,
    paddingTop: 60,
  },
  pageTitle: {
    fontSize: 26,
    fontFamily: 'ms-bold',
    color: '#6c63ff',
    marginBottom: 30,
    textAlign: 'center',
  },
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 40,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#6c63ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    elevation: 4,
  },
  name: {
    fontSize: 20,
    color: '#333',
    fontFamily: 'ms-bold',
  },
  email: {
    fontSize: 14,
    color: '#777',
    marginTop: 4,
    fontFamily: 'ms-regular',
  },
  buttonGroup: {
    gap: 14,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 16,
    justifyContent: 'center',
    elevation: 3,
  },
  iconLeft: {
    marginRight: 8,
  },
  primaryButton: {
    backgroundColor: '#6c63ff',
  },
  logoutButton: {
    backgroundColor: '#ff5252',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'ms-bold',
  },
});
