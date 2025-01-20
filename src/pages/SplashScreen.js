import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const SplashScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>MasAI</Text>
            <Text style={styles.subtitle}>Yapay Zekayla Kendi Masalını Oluşturmaya Hazır Mısın?</Text>
            <Button title="Başla" onPress={() => navigation.navigate('Home')} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#6c63ff',
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        marginVertical: 20,
    },
});

export default SplashScreen;
