import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { API_URL } from '@env';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  


const handleRegister = async () => {
  if (!name || !email || !password) {
    Alert.alert('Eksik Bilgi', 'Lütfen tüm alanları doldur.');
    return;
  }

  try {
    setIsLoading(true); // ⏳ Başlat
    const response = await axios.post(`${API_URL}/auth/register`, {
      name,
      email,
      password,
    });

    const token = response.data.access_token;
    await AsyncStorage.setItem('token', token);

    Alert.alert('Kayıt Başarılı', 'Giriş yapabilirsiniz!');
    navigation.replace('LoginScreen');
  } catch (error) {
    const msg = error?.response?.data?.message || 'Bir hata oluştu';
    Alert.alert('Hata', msg.toString());
  } finally {
    setIsLoading(false); // ✅ Bitir
  }
};

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -100}
      style={styles.keyboardContainer}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Kayıt Ol</Text>

        <TextInput
          style={styles.input}
          placeholder="İsim"
          placeholderTextColor="#aaa"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="E-posta"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Şifre"
          value={password}
          onChangeText={setPassword}
          placeholderTextColor="#aaa"
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons
            name={showPassword ? 'eye-off' : 'eye'}
            size={22}
            color="#A75CFF"
          />
        </TouchableOpacity>
      </View>
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Kayıt Ol</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.link}>Zaten hesabın var mı? Giriş yap</Text>
        </TouchableOpacity>
        {isLoading && (
          <View style={styles.loadingOverlay}>
            <View style={styles.loadingBox}>
              <ActivityIndicator size="large" color="#6c63ff" />
              <Text style={styles.loadingText}>Kayıt olunuyor...</Text>
            </View>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontFamily: 'ms-bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    borderWidth: 0.5,
    borderColor: '#ddd',
    backgroundColor: '#f9f9f9',
    padding: 14,
    borderRadius: 18,
    fontFamily: 'ms-regular',
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#A75CFF',
    paddingVertical: 14,
    borderRadius: 18,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'ms-bold',
    fontSize: 16,
  },
  link: {
    color: '#A75CFF',
    textAlign: 'center',
    textDecorationLine: 'underline',
    fontFamily: 'ms-regular',
    fontSize: 14,
  },
  loadingOverlay: {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.3)',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 10,
},
loadingBox: {
  backgroundColor: '#fff',
  paddingVertical: 20,
  paddingHorizontal: 40,
  borderRadius: 16,
  elevation: 6,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.3,
  shadowRadius: 4,
},
loadingText: {
  fontSize: 16,
  fontFamily: 'ms-regular',
  color: '#6c63ff',
  marginTop: 12,
},
passwordContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  borderWidth: 0.5,
  borderColor: '#ddd',
  backgroundColor: '#f9f9f9',
  borderRadius: 18,
  paddingHorizontal: 14,
  marginBottom: 16,
},

passwordInput: {
  flex: 1,
  paddingVertical: 14,
  fontSize: 16,
  fontFamily: 'ms-regular',
  color: '#333',
},
});
