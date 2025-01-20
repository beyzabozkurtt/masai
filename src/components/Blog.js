import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Blog = () => {
    return (
        <View style={styles.container}>
            {/* Başlık ve İkon */}
            <View style={styles.header}>
                <Ionicons name="book-outline" size={24} color="#000" />
                <Text style={styles.title}>Blog</Text>
            </View>

            {/* İçerik */}
            <Text style={styles.content}>
                 MasAI ile yaratıcılığınızı keşfedin. Masallarınızı oluşturarak hayal dünyanızı genişletin!
            </Text>


        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
        padding: 15,
        backgroundColor: 'rgba(246,225,237,0.93)',
        borderRadius: 15, // Daha yuvarlak kenarlar
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3, // Android için gölge
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    title: {
        fontSize: 18,
        fontFamily: 'ms-bold',
        color: '#000400',
        marginLeft: 8, // İkon ile başlık arasına boşluk
    },
    content: {
        fontSize: 14,
        color: '#555',
        lineHeight: 20, // Yazılar arasına boşluk
        marginBottom: 10, // Yazı ile footer arasına boşluk
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },

});

export default Blog;
