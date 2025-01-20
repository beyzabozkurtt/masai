import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Blog = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Blog</Text>
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
        backgroundColor: '#fff5f5',
        borderRadius: 8,
    },
    title: {
        fontSize: 18,
        fontFamily: 'ms-bold',
        marginBottom: 40,
    },
    content: {
        fontSize: 14,
        color: '#555',
    },
});

export default Blog;
