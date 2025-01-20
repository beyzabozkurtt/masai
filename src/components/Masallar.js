import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const masallar = [
    {
        id: 1,
        title: 'Gizemli Orman',
        author: 'Beyza Bozkurt',
        image: require('../assets/images/buyukmacera.png'),
    },
    {
        id: 3,
        title: 'Gerçek Dostluk',
        author: 'Asıl Turatbek Kyzy',
        image: require('../assets/images/gercek_dostluk.png'),
    },
    {
        id: 2,
        title: 'Büyük Macera',
        author: 'Cesim Poyraz',
        image: require('../assets/images/gizemli_orman.png'),
    },

];

const Masallar = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Masal Kütüphanesi</Text>
            <View style={styles.masallarRow}>
                {masallar.map((masal) => (
                    <TouchableOpacity
                        key={masal.id}
                        style={styles.masal}
                        onPress={() => navigation.navigate('MasalGeneratePage', { masal: masal.title })}
                    >
                        <Image source={masal.image} style={styles.image} />
                        <Text style={styles.text}>{masal.title}</Text>
                        <Text style={styles.author}>{masal.author}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
        marginTop:-15,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
        fontFamily  : 'ms-bold',
    },
    masallarRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    masal: {
        borderRadius: 15, // Köşeleri yuvarlat
        padding: 5,
        alignItems: 'center',
        shadowColor: '#000', // Gölge ekle
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3, // Android için gölge
        overflow: 'hidden', // Gölgenin kutunun dışına taşmasını engelle
    },
    image: {
        width: '110%',
        height: 160,
        resizeMode: 'cover',
        marginBottom: 8,
        borderRadius: 10, // Görselin köşelerini yuvarlat
    },
    text: {
        fontSize: 14,
        fontWeight: 'bold',
        fontFamily: 'ms-bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 3,
    },
    author: {
        fontSize: 12,
        color: '#6c63ff',
        textAlign: 'center',
        fontFamily: 'ms-light',
    },
});

export default Masallar;