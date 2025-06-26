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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@env';

export default function MyStoriesPage({ navigation }) {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyStories = async () => {
    try {
      setLoading(true);

      // ✅ Giriş yapan kullanıcının ID'sini al
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) throw new Error('Giriş yapan kullanıcı ID\'si bulunamadı.');

      // ✅ Tüm herkese açık masalları getir
      const response = await axios.get(`${API_URL}/story/public-stories`);
      let data = response.data;
      if (!Array.isArray(data)) data = [];

      // ✅ Sadece giriş yapan kullanıcıya ait ve görseli cloudinary'de olan masallar
      const userStories = data.filter(
        (story) =>
          story.userRef?._id === userId &&
          typeof story.imageUrl === 'string' &&
          story.imageUrl.includes('res.cloudinary.com')
      );

      // ✅ Aynı başlıktan sadece en yeni olanı al
      const latestByTitle = {};
      for (const story of userStories) {
        const existing = latestByTitle[story.title];
        const currentTime = new Date(story.createdAt).getTime();
        const existingTime = existing ? new Date(existing.createdAt).getTime() : 0;
        if (!existing || currentTime > existingTime) {
          latestByTitle[story.title] = story;
        }
      }

      setStories(Object.values(latestByTitle));
    } catch (err) {
      console.error('❌ Kullanıcının masalları alınamadı:', err.message);
      setStories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyStories();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate('HomeStack', {
          screen: 'StoryResult',
          params: {
            id: item._id,
            title: item.title || 'Başlık yok',
            fullStory: item.fullStory || 'Masal içeriği bulunamadı.',
            author: item.userRef?.name || 'Siz',
            theme: item.theme || 'Tema yok',
            characters: Array.isArray(item.characters) ? item.characters : ['Belirtilmemiş'],
            imageUrl: item.imageUrl || null,
          },
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
      <Text style={styles.pageTitle}>Benim Masallarım</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#6c63ff" style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={stories}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20, marginTop: 50 },
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
});
