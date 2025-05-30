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

const themes = [
  'macera',
  'dostluk',
  'bilgelik',
  'doğa',
  'hayvanlar',
  'aile',
  'sihir',
];

export default function PublicStoriesPage({ navigation }) {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTheme, setSelectedTheme] = useState('');

  const fetchStories = async (theme = '') => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/story/public-stories`, {
        params: theme ? { theme } : {},
      });
      console.log('Gelen veri:', response.data); 
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

  const handleThemeSelect = (theme) => {
    const newTheme = selectedTheme === theme ? '' : theme;
    setSelectedTheme(newTheme);
    fetchStories(newTheme);
  };

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
      <Text style={styles.pageTitle}>Herkese Açık Masallar</Text>

      <View style={styles.themeFilter}>
        {themes.map((theme) => (
          <TouchableOpacity
            key={theme}
            style={[
              styles.themeButton,
              selectedTheme === theme && styles.themeButtonActive,
            ]}
            onPress={() => handleThemeSelect(theme)}
          >
            <Text
              style={[
                styles.themeButtonText,
                selectedTheme === theme && styles.themeButtonTextActive,
              ]}
            >
              {theme}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

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
  container: { flex: 1, backgroundColor: '#fff', padding: 20,marginTop:50 },
  pageTitle: {
    fontSize: 24,
    fontFamily: 'ms-bold',
    color: '#6c63ff',
    marginBottom: 15,
    textAlign:"center"
  },
  themeFilter: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  themeButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  themeButtonActive: {
    backgroundColor: '#6c63ff',
    borderColor: '#6c63ff',
  },
  themeButtonText: {
    fontSize: 14,
    color: '#333',
    fontFamily: 'ms-regular',
  },
  themeButtonTextActive: {
    color: '#fff',
    fontFamily: 'ms-bold',
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
