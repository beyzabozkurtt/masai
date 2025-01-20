import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const categories = [
    { title: 'Keşif', image: require('../assets/images/kesif.png') },
    { title: 'Gizem', image: require('../assets/images/gizemli.png') },
    { title: 'Macera', image: require('../assets/images/macera.png') },
    { title: 'Dostluk', image: require('../assets/images/dostluk.png') },
];

const Categories = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}></Text>
            <View style={styles.categoriesRow}>
                {categories.map((category, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.category}
                        onPress={() => navigation.navigate('MasalGeneratePage', { theme: category.title })}
                    >
                        <Image source={category.image} style={styles.image} />
                        <Text style={styles.text}>{category.title}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 30,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
        fontFamily: 'ms-bold',
    },
    categoriesRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    category: {
        alignItems: 'center',
        backgroundColor: '#e8f5e9',
        padding: 10,
        borderRadius: 15,
        width: '22%',
        height: 100,

    },
    image: {
        width: 55,
        height: 55,
        resizeMode: 'contain',
        marginBottom: 10,
    },
    text: {
        fontSize: 12,
        color: '#333',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

export default Categories;
