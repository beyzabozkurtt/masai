import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const categories = ['Keşif', 'Gizem', 'Macera', 'Dostluk'];

const Categories = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Kategoriler</Text>
            {categories.map((category, index) => (
                <TouchableOpacity
                    key={index}
                    style={styles.category}
                    onPress={() => navigation.navigate('MasalGeneratePage', { theme: category })}
                >
                    <Text style={styles.text}>{category}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    category: {
        backgroundColor: '#e8eaf6',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
    },
    text: {
        fontSize: 16,
        color: '#333',
    },
});

export default Categories;
