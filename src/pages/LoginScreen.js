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
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { API_URL } from '@env';


export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);


  const handleLogin = async () => {

  if (!email || !password) {
    Alert.alert('Eksik Bilgi', 'Lütfen e-posta ve şifrenizi girin.');
    return;
  }

  try {
    setIsLoading(true); // Yüklenme başlasın
    const response = await axios.post(`https://masal-backend-on7u.onrender.com/auth/login`, { email, password });
    const token = response.data.access_token;
    const name = response.data.name;
    await AsyncStorage.setItem('token', token);
    await AsyncStorage.setItem('name', name);
    navigation.replace('Home');
  } catch (error) {
    const msg = error?.response?.data?.message || 'Bir hata oluştu';
    Alert.alert('Hata', msg.toString());
  } finally {
    setIsLoading(false); // Yüklenme bitsin
  }
};

  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
    style={styles.keyboardContainer}
    keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 200}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Giriş Yap</Text>

        <TextInput
          style={styles.input}
          placeholder="E-posta"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="#aaa"
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
        <TouchableOpacity style={styles.button} 
        onPress={() => {
          Keyboard.dismiss(); // ✅ Klavyeyi önce kapat
          handleLogin();      // 🔐 Sonra giriş işlemini başlat
        }}>
          <Text style={styles.buttonText}>Giriş Yap</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
          <Text style={styles.link}>Üye değil misin? Kayıt ol</Text>
        </TouchableOpacity>
        {isLoading && (
          <View style={styles.loadingOverlay}>
            <View style={styles.loadingBox}>
              <ActivityIndicator size="large" color="#6c63ff" />
              <Text style={styles.loadingText}>Giriş yapılıyor...</Text>
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
