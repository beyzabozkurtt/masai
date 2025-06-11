import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, ScrollView, Dimensions, RefreshControl } from 'react-native';
import Header from '../components/Header';
import Categories from '../components/Categories';
import Masallar from '../components/Masallar';
import Blog from '../components/Blog';
import AsyncStorage from '@react-native-async-storage/async-storage';

const windowWidth = Dimensions.get('window').width;

const HomePage = ({ navigation }) => {
  const [userName, setUserName] = useState('');
  const [refreshing, setRefreshing] = useState(false);

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

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchUserName();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    fetchUserName();
  }, []);

  return (
    <ScrollView
      style={[styles.container, { paddingHorizontal: windowWidth * 0.025 }]}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          progressViewOffset={80} // 👈 Spinner'ı biraz aşağıya çeker
        />
      }
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
