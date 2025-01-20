import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';

const MasalGeneratePage = ({ route, navigation }) => {
    const { theme } = route.params; // Temayı almak için
    const [storyStart, setStoryStart] = useState(''); // Kullanıcının hikaye başlangıcı

    const handleGenerateStory = () => {
        if (storyStart.trim() === '') {
            Alert.alert('Hata', 'Masal başlangıcı yazmadan devam edemezsin!');
            return;
        }
        // Masal oluşturma sonrası ekrana git
        navigation.navigate('StoryResult', { theme, storyStart });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Masal Teması: {theme}</Text>
            <Text style={styles.subtitle}>
                "{theme}" temasıyla bir masal oluşturmak için bir başlangıç yaz!
            </Text>

            <TextInput
                style={styles.textInput}
                placeholder="Masalının başlangıcını buraya yaz..."
                multiline
                value={storyStart}
                onChangeText={setStoryStart}
            />

            <TouchableOpacity style={styles.button} onPress={handleGenerateStory}>
                <Text style={styles.buttonText}>Masalı Oluştur</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#6c63ff',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#555',
        marginBottom: 20,
    },
    textInput: {
        height: 150,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 10,
        fontSize: 16,
        textAlignVertical: 'top',
        marginBottom: 20,
        backgroundColor: '#f9f9f9',
    },
    button: {
        backgroundColor: '#6c63ff',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default MasalGeneratePage;
