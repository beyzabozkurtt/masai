import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const categories = [
    { title: 'Keşif' },
    { title: 'Gizem' },
    { title: 'Macera' },
    { title: 'Dostluk' },
    { title: 'Doğa' },
    { title: 'Bilgelik' },
    { title: 'Hayvanlar' },
    { title: 'Aile' },
    { title: 'Sihir' },
];

const Categories = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}></Text>
            <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false} 
                contentContainerStyle={styles.categoriesRow}
            >
                {categories.map((category, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.category}
                        onPress={() => navigation.navigate('CategoryStoriesPage', { theme: category.title })}
                    >
                        <Text style={styles.text}>{category.title}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 30,
        marginTop: -20,
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
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    category: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#e8f5e9',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 15,
        marginRight: 12,
        height: 100,
        minWidth: 90,
    },
    text: {
        fontSize: 14,
        color: '#333',
        textAlign: 'center',
        fontWeight: 'bold',
        fontFamily: 'ms-bold',
    },
});

export default Categories;
