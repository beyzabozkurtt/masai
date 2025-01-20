import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const masallar = [
    { id: 1, title: 'Gizemli Orman' },
    { id: 2, title: 'Büyük Macera' },
    { id: 3, title: 'Gerçek Dostluk' },
];

const Masallar = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Masal Kütüphanesi</Text>
            {masallar.map((masal) => (
                <TouchableOpacity
                    key={masal.id}
                    style={styles.masal}
                    onPress={() => navigation.navigate('MasalGeneratePage', { masal: masal.title })}
                >
                    <Text style={styles.text}>{masal.title}</Text>
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
    masal: {
        backgroundColor: '#d1e7dd',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
    },
    text: {
        fontSize: 16,
        color: '#333',
    },
});

export default Masallar;
