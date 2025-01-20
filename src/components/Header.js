import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // İkonlar için

const Header = ({ onMenuPress, onSearchPress }) => {
    return (
        <View>
            {/* Üstteki Beyaz Alan */}
            <View style={styles.topBar}>
                <TouchableOpacity onPress={onMenuPress} style={styles.iconLeft}>
                    <Ionicons name="grid-outline" size={24} color="#6c63ff" />
                </TouchableOpacity>

                <TouchableOpacity onPress={onSearchPress} style={styles.iconRight}>
                    <Ionicons name="search-outline" size={24} color="#6c63ff" />
                </TouchableOpacity>
            </View>

            {/* Altındaki Sarı Alan */}
            <View style={styles.header}>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>Yapay Zekayla kendi Masalını Oluştur!</Text>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Başla</Text>
                    </TouchableOpacity>
                </View>
                <Image
                    source={require('../assets/images/star.png')} // Yıldız PNG yolunu ekle
                    style={styles.starImage}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    topBar: {
        backgroundColor: '#fff',
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20, // Sol ve sağ boşluk
        marginBottom: 2, // Beyaz alan ile sarı alan arasında boşluk
    },
    iconLeft: {
        padding: 5,
    },
    iconRight: {
        padding: 5,
    },
    header: {
        backgroundColor: '#FFA500',
        borderRadius: 15,
        padding: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textContainer: {
        flex: 1,
        marginRight: 10, // Yıldızla metin arasındaki boşluk
    },
    title: {
        color: '#fff',
        fontSize: 27,
        fontFamily: 'ms-bold',
        marginBottom: 10, // Başlık ile buton arasındaki boşluk
        maxWidth: 250, // Başlığın maksimum genişliği
    },
    button: {
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 35,
        borderRadius: 15,
        alignSelf: 'flex-start',
        bottom: -20, // Butonun aşağı kaydırılması
    },
    buttonText: {
        color: '#6c63ff',
        fontSize: 16,
        fontFamily: 'ms-bold',
    },
    starImage: {
        width: 200, // Yıldızın genişliği büyütüldü
        height: 200,
        resizeMode: 'contain',
        position: 'absolute',
        right: -10, // Yıldızın sağa kaydırılması
        bottom: 25, // Yıldızın aşağı kaydırılması
    },
});

export default Header;
