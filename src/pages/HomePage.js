import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import Header from '../components/Header';
import Categories from '../components/Categories';
import Masallar from '../components/Masallar';
import Blog from '../components/Blog';
import AsyncStorage from '@react-native-async-storage/async-storage';

const windowWidth = Dimensions.get('window').width;

const HomePage = ({ navigation }) => {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const storedName = await AsyncStorage.getItem('name');
        if (storedName) {
          setUserName(storedName);
        }
      } catch (error) {
        console.error('Kullanıcı adı alınamadı:', error);
      }
    };

    fetchUserName();
  }, []);

  return (
    <ScrollView
      style={[styles.container, { paddingHorizontal: windowWidth * 0.025 }]} // 👈 Daha az boşluk
      showsVerticalScrollIndicator={false}
    >
      <Header name={userName} navigation={navigation} />
      <Categories navigation={navigation} />
      <Masallar navigation={navigation} />
      <Blog />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 10,
  },
});

export default HomePage;
