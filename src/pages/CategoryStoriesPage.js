import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';

import { API_URL } from '@env';


export default function CategoryStoriesPage({ route, navigation }) {
  const { theme } = route.params;
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStories = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/story/public-stories`, {
        params: { theme },
      });
      setStories(response.data);
    } catch (err) {
      console.error('Masallar getirilemedi:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate('StoryDetail', {
          title: item.title || 'Başlık yok',
          theme: item.theme || 'Tema yok',
          likesCount: item.likesCount || 0,
          fullStory: item.fullStory || 'Masal içeriği bulunamadı.',
          characters: Array.isArray(item.characters) ? item.characters : ['Belirtilmemiş'],
        })
      }
    >
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.meta}>Tema: {item.theme}</Text>
      <Text style={styles.meta}>Beğeni: {item.likesCount}</Text>

      {item.fullStory && (
        <Text style={styles.storyPreview} numberOfLines={4}>
          {item.fullStory}
        </Text>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>{theme} Masalları</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#6c63ff" style={{ marginTop: 40 }} />
      ) : stories.length > 0 ? (
        <FlatList
          data={stories}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      ) : (
        <Text style={styles.noStoriesText}>Bu kategoride masal bulunamadı.</Text>
      )}

      {/* Geri Dön Butonu */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Geri Dön</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  pageTitle: {
    fontSize: 24,
    fontFamily: 'ms-bold',
    color: '#6c63ff',
    marginBottom: 15,
    textAlign: 'center',
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    padding: 16,
    borderRadius: 14,
    backgroundColor: '#f9f9f9',
    marginBottom: 12,
    borderLeftWidth: 5,
    borderLeftColor: '#6c63ff',
  },
  title: {
    fontSize: 18,
    fontFamily: 'ms-bold',
    color: '#333',
  },
  meta: {
    fontSize: 14,
    fontFamily: 'ms-regular',
    color: '#666',
    marginTop: 4,
  },
  storyPreview: {
    marginTop: 8,
    fontSize: 14,
    color: '#444',
    fontFamily: 'ms-regular',
    lineHeight: 20,
  },
  noStoriesText: {
    fontSize: 16,
    fontFamily: 'ms-regular',
    textAlign: 'center',
    marginTop: 50,
    color: '#999',
  },
  backButton: {
    marginTop: 20,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: '#6c63ff',
    alignItems: 'center',
    alignSelf: 'center',
    width: '50%',
  },
  backButtonText: {
    color: '#fff',
    fontFamily: 'ms-bold',
    fontSize: 16,
  },
});
