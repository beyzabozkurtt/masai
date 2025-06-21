import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import { API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function StoryResult({ route, navigation }) {
  const {
    id,
    title: routeTitle,
    fullStory: routeStory,
    author: routeAuthor,
    theme: routeTheme,
    characters: routeCharacters,
    imageUrl: routeImageUrl,
    likesCount: routeLikesCount,
  } = route.params;

  const [storyData, setStoryData] = useState({
    title: routeTitle || '',
    fullStory: routeStory || '',
    author: routeAuthor || 'Bilinmeyen',
    theme: routeTheme || null,
    characters: routeCharacters || [],
    imageUrl: routeImageUrl || null,
  });

  const [likesCount, setLikesCount] = useState(routeLikesCount || 0);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(!routeStory);

  useEffect(() => {
  const fetchStoryIfNeeded = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`${API_URL}/story/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      if (!routeStory) {
        setStoryData({
          title: data.title || 'Başlık Yok',
          fullStory: data.fullStory || 'Masal içeriği bulunamadı.',
          author: data.userRef?.name || 'Bilinmeyen',
          theme: data.theme || null,
          characters: data.characters || [],
          imageUrl: data.imageUrl || null,
        });
      }

      setLikesCount(data.likesCount || 0);
      setLiked(data.liked || false); // 👍 burası önemli
    } catch (err) {
      console.error('Masal detayları alınamadı:', err);
    } finally {
      setLoading(false);
    }
  };

  fetchStoryIfNeeded();
}, [id]);


  const handleToggleLike = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`${API_URL}/begeni/${id}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();
      if (response.ok) {
        setLiked(result.liked);
        setLikesCount(result.likesCount);
      } else {
        console.error('Beğeni güncellenemedi:', result.message || 'Hata');
      }
    } catch (err) {
      console.error('Beğeni isteği başarısız:', err);
    }
  };

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
       

        {storyData.imageUrl && (
            <Image
                source={{ uri: storyData.imageUrl }}
                style={styles.storyImage}
                resizeMode="contain"
                
            />
        )}
 <Text style={styles.title}>{storyData.title}</Text>
        <Text style={styles.subtitle}>Yazan: {storyData.author}</Text>
        {storyData.theme && <Text style={styles.subtitle}>Tema: {storyData.theme}</Text>}
        
        {/* 💜 Beğeni Butonu */}
        <TouchableOpacity
            style={[styles.likeButton, liked ? styles.liked : null]}
            onPress={handleToggleLike}
        >
          <Text style={styles.likeButtonText}>
            {liked ? '💜 Beğenildi' : '🤍 Beğen'}
          </Text>
          <Text style={styles.likeCount}>({likesCount})</Text>
        </TouchableOpacity>

        <Text style={styles.story}>
        {storyData.fullStory || 'Masal içeriği bulunamadı.'}
        </Text>

      </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#fff',
    flexGrow: 1,
    marginTop: 60,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 30,
    fontFamily: 'ms-bold',
    color: '#6c63ff',
    marginBottom: 15,
    textAlign: 'center',
  },
  storyImage: {
  width: '80%',
  aspectRatio: 1, // 📸 Oranı korur, kareye yakınsa tam oturur
  borderRadius: 16,
  marginBottom: 20,
  alignSelf: 'center',
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
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'left',
  },
  likeButtonText: {
    fontSize: 16,
    fontFamily: 'ms-bold',
    color: '#6c63ff',
    marginRight: 8,
  },
  likeCount: {
    fontSize: 14,
    fontFamily: 'ms-regular',
    color: '#6c63ff',
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
