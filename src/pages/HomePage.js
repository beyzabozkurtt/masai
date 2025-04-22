import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Header from '../components/Header';
import Categories from '../components/Categories';
import Blog from '../components/Blog';
import Masallar from '../components/Masallar';

import AsyncStorage from '@react-native-async-storage/async-storage';


const HomePage = ({ navigation }) => {
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const getName = async () => {
          const storedName = await AsyncStorage.getItem('name');
          if (storedName) setUserName(storedName);
        };
        getName();
      }, []);

    return (
        <ScrollView style={styles.container}>
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
        padding: 10,
    },
});

export default HomePage;
