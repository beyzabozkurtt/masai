import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Header from '../components/Header';
import Categories from '../components/Categories';
import Blog from '../components/Blog';
import Masallar from '../components/Masallar';

const HomePage = ({ navigation }) => {
    return (
        <ScrollView style={styles.container}>
            {/* Header */}
            <Header />

            {/* Kategoriler */}
            <Categories navigation={navigation} />

            {/* Blog */}
            <Blog />

            {/* Masallar */}
            <Masallar navigation={navigation} />
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
