
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

export default function StoryResult({ route, navigation }) {
  const {
    id, // 👈 masal ID'si gönderilmiş mi kontrol ediyoruz
    title: routeTitle,
    fullStory: routeStory,
    author: routeAuthor,
    theme: routeTheme,
    characters: routeCharacters,
  } = route.params;

  const [storyData, setStoryData] = useState({
    title: routeTitle || '',
    fullStory: routeStory || '',
    author: routeAuthor || 'Bilinmeyen',
    theme: routeTheme || null,
    characters: routeCharacters || [],
  });

  const [loading, setLoading] = useState(!routeStory); // eğer fullStory yoksa fetch'e ihtiyaç var

  useEffect(() => {
    const fetchStoryIfNeeded = async () => {
      if (!routeStory && id) {
        try {
          const response = await fetch(`https://masal-backend-on7u.onrender.com/story/${id}`);
          const data = await response.json();
          setStoryData({
            title: data.title || 'Başlık Yok',
            fullStory: data.fullStory || 'Masal içeriği bulunamadı.',
            author: data.userRef?.name || 'Bilinmeyen',
            theme: data.theme || null,
            characters: data.characters || [],
          });
        } catch (err) {
          console.error('Masal detayları alınamadı:', err);
          setStoryData((prev) => ({ ...prev, fullStory: 'Masal yüklenemedi.' }));
        } finally {
          setLoading(false);
        }
      }
    };

    fetchStoryIfNeeded();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#6c63ff" />
        <Text style={{ marginTop: 12, color: '#6c63ff' }}>Masal yükleniyor...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{storyData.title}</Text>

      <Text style={styles.subtitle}>Yazan: {storyData.author}</Text>
      {storyData.theme && <Text style={styles.subtitle}>Tema: {storyData.theme}</Text>}
      {storyData.characters.length > 0 && (
        <Text style={styles.subtitle}>
          Karakterler: {storyData.characters.join(', ')}
        </Text>
      )}

      <Text style={styles.story}>
        {storyData.fullStory ? storyData.fullStory : 'Masal içeriği bulunamadı.'}
      </Text>

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
    flexGrow: 1,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontFamily: 'ms-bold',
    color: '#6c63ff',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    fontFamily: 'ms-regular',
    color: '#555',
    marginBottom: 6,
  },
  story: {
    fontSize: 16,
    fontFamily: 'ms-regular',
    color: '#333',
    lineHeight: 24,
    marginTop: 20,
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#6c63ff',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'ms-bold',
    fontSize: 16,
  },
});
