import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Header from '../components/Header';
import Categories from '../components/Categories';
import TopLikedStories from '../components/TopLikedStories';
import Masallar from '../components/Masallar';
import Blog from '../components/Blog';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <Header name={userName} navigation={navigation} />

      {/* Kategoriler */}
      <Categories navigation={navigation} />

      {/* Masallar */}
      <Masallar navigation={navigation} />

      {/* Blog */}
      <Blog />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
});

export default HomePage;
