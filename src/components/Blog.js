import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const windowWidth = Dimensions.get('window').width;

const Blog = () => {
    return (
        <View style={styles.container}>
            {/* Başlık ve İkon */}
            <View style={styles.header}>
                <Ionicons name="sparkles-outline" size={22} color="#6c63ff" />
                <Text style={styles.title}>Masal Dünyası</Text>
            </View>

            {/* İçerik */}
            <Text style={styles.content}>
                MasAI ile kendi masal evrenini oluştur! Karakterlerini seç, temanı belirle ve yapay zekâ ile bambaşka bir hikâye yaz. 
                Hayal gücünün sınırlarını zorla — çünkü bu dünya senin!
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: windowWidth - 30, // kenarlardan boşluk bırak
        alignSelf: 'center',
        marginVertical: 15,
        padding: 15,
        backgroundColor: '#f0f0f0',
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 3,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    title: {
        fontSize: 18,
        fontFamily: 'ms-bold',
        color: '#6c63ff',
        marginLeft: 8,
    },
    content: {
        fontSize: 14,
        color: '#333',
        lineHeight: 22,
        fontFamily: 'ms-regular',
    },
});

export default Blog;
