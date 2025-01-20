import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';

const SplashScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            {/* Logo Resmi */}
            <Image
                source={require('../assets/images/splash_img.png')}
                style={styles.image}
            />

            {/* MasAI Yazısı */}
            <Image
                source={require('../assets/images/masai_logo.png')} // Logo dosyasını eklediğin yola göre ayarla
                style={styles.logo}
            />

            {/* Alt Açıklama */}
            <Text style={styles.subtitle}>
                Yapay Zekayla kendi Masalını Oluşturmaya Hazır Mısın?
            </Text>

            {/* Başla Butonu */}
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Home')}
            >
                <Text style={styles.buttonText}>Başla</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20,
    },
    image: {
        width: 300,
        height: 400,
        resizeMode: 'contain',
        marginBottom: -70,
        marginTop: -80,

    },
    logo: {
        width: 200,
        height: 150,
        resizeMode: 'contain',
        marginBottom: 5,
        marginEnd: 2,
    },
    subtitle: {
        fontSize: 18,
        fontFamily: 'ms-regular',
        color: '#555',
        textAlign: 'center',
        marginBottom: 80,
        maxWidth: 300,
    },
    button: {
        backgroundColor: '#a75cff',
        paddingVertical: 15,
        paddingHorizontal: 45,
        borderRadius: 20,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'ms-bold',
    },
});

export default SplashScreen;
