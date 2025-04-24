import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

export default function StoryResult({ route, navigation }) {
  const { title, fullStory, theme, characters = [] } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{title}</Text>

      <Text style={styles.subtitle}>Tema: {theme}</Text>
      <Text style={styles.subtitle}>
        Karakterler: {characters.length > 0 ? characters.join(', ') : 'Belirtilmemiş'}
      </Text>

      <Text style={styles.story}>{fullStory ? fullStory : 'Masal içeriği bulunamadı.'}</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.buttonText}>Ana Sayfaya Dön</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontFamily: 'ms-bold',
    color: '#6c63ff',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'ms-regular',
    color: '#333',
    marginBottom: 8,
  },
  story: {
    fontSize: 16,
    fontFamily: 'ms-regular',
    color: '#444',
    lineHeight: 24,
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#6c63ff',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'ms-bold',
    fontSize: 16,
  },
});
