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
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'https://masal-backend-on7u.onrender.com/auth';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password });
      const token = response.data.access_token;
      const name = response.data.name;
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('name', name);
      navigation.replace('Home');
    } catch (error) {
      const msg = error?.response?.data?.message || 'Bir hata oluştu';
      Alert.alert('Hata', msg.toString());
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
        <TextInput
          style={styles.input}
          placeholder="Şifre"
          value={password}
          onChangeText={setPassword}
          placeholderTextColor="#aaa"
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Giriş Yap</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
          <Text style={styles.link}>Üye değil misin? Kayıt ol</Text>
        </TouchableOpacity>
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
});
