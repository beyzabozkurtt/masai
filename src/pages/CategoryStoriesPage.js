import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
    Image,
} from 'react-native';
import { Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';

import { API_URL } from '@env';


const { width } = Dimensions.get('window');
const cardWidth = width * 0.9;
const imageSize = width * 0.4;
export default function CategoryStoriesPage({ route, navigation }) {
  const { theme } = route.params || {};

  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likedItems, setLikedItems] = useState({});

const toggleLike = (id) => {
  setLikedItems((prev) => ({
    ...prev,
    [id]: !prev[id],
  }));
};
const handleLike = async (storyId) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.post(`http://10.102.68.141:3000/begeni/${storyId}`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data) {
  setStories(prevStories =>
    prevStories.map(story =>
      story._id === storyId
        ? { ...story, likesCount: response.data.likesCount, liked: response.data.liked }
        : story
    )
  );

  setLikedItems(prev => ({
    ...prev,
    [storyId]: !!response.data.liked,
  }));
}

  } catch (err) {
    console.error('Beğeni işlemi başarısız:', err?.response?.data || err.message);
  }
};

  useEffect(() => {
    if (!theme) {
      console.warn('Tema bulunamadı.');
      navigation.goBack();
      return;
    }
    fetchStories();
  }, []);

const fetchStories = async () => {
  try {
    setLoading(true);
    const token = await AsyncStorage.getItem('token');
    const response = await axios.get(`http://10.102.68.141:3000/story/public-stories`, {
      params: { theme: theme.trim() },
      headers: { Authorization: `Bearer ${token}` },
    });

    // Gelen her story için likesCount ve liked alanlarının kesin olduğundan emin ol
    const storiesWithLikes = response.data.map(story => ({
      ...story,
      likesCount: story.likesCount || 0,
      liked: !!story.liked,  // kesin boolean
    }));

    setStories(storiesWithLikes);

    // likedItems için kesin boolean dönüşüm
    const likedMap = {};
    storiesWithLikes.forEach(story => {
      likedMap[story._id] = story.liked;
    });
    setLikedItems(likedMap);

  } catch (err) {
    console.error('Masallar getirilemedi:', err?.response?.data || err.message || err);
  } finally {
    setLoading(false);
  }
};


const renderItem = ({ item }) => {
  // stories dizisindeki güncel veriyi bul
  const storyFromState = stories.find(s => s._id === item._id) || item;
  const liked = likedItems[item._id];
  const likesCount = storyFromState.likesCount || 0;

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate('HomeStack', {
          screen: 'StoryResult',
          params: {
            id: item._id,
            title: item.title || 'Başlık yok',
            fullStory: item.fullStory || 'Masal içeriği bulunamadı.',
            author: item.userRef?.name || 'Bilinmeyen',
            theme: item.theme || 'Tema yok',
            characters: Array.isArray(item.characters) ? item.characters : ['Belirtilmemiş'],
            imageUrl: item.imageUrl || null,
          },
        })
      }
    >
      <View style={styles.cardContent}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.meta}>
            <Text style={styles.metaLabel}>Yazar: </Text>
            <Text style={styles.metaValue}>{item.userRef?.name || 'Bilinmeyen'}</Text>
          </Text>

          <Text style={styles.meta}>
            <Text style={styles.metaLabel}>Tema: </Text>
            <Text style={styles.metaValue}>{item.theme || 'Tema yok'}</Text>
          </Text>

          <TouchableOpacity style={styles.likeRow} onPress={() => handleLike(item._id)}>
            <AntDesign
              name={liked ? 'heart' : 'hearto'}
              size={22}
              color={liked ? '#ff0000' : '#aaa'}
            />
            <Text style={[styles.likeText, liked && { color: '#ff0000' }]}>
              {likesCount}
            </Text>
          </TouchableOpacity>
        </View>

        {item.imageUrl && (
          <Image
            source={{ uri: item.imageUrl }}
            style={styles.imageStyle}
            resizeMode="cover"
          />
        )}
      </View>
    </TouchableOpacity>
  );
};



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
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <Text style={styles.noStoriesText}>Bu kategoride masal bulunamadı.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  pageTitle: {
    fontSize: 24,
    fontFamily: 'ms-bold',
    color: '#6c63ff',
    marginBottom: 15,
    textAlign: 'center',
  },
  list: {
    paddingBottom: 0,
  },
  card: {
  width: cardWidth,
  alignSelf: 'center',
  padding: 12,
  borderRadius: 14,
  backgroundColor: '#f9f9f9',
  marginBottom: 16,
  borderLeftWidth: 5,
  borderLeftColor: '#6c63ff',
},

cardContent: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
},

textContainer: {
  flex: 1,
  paddingRight: 10,
},

title: {
  fontSize: 18,
  fontFamily: 'ms-bold',
  color: '#333',
  textAlign: 'left',
  marginBottom: 10,
},

meta: {
  fontSize: 14,
  fontFamily: 'ms-regular',
  color: '#6c63ff',
  marginTop: 4,
  textAlign: 'left',
},
metaLabel: {
  fontFamily: 'ms-light',
  fontSize: 14,
  color: '#6c63ff',
},

metaValue: {
  fontFamily: 'ms-regular',
  fontSize: 14,
  color: '#6c63ff',
},

imageStyle: {
  width: imageSize,
  height: imageSize,
  borderRadius: 10,
},
  storyPreview: {
    marginTop: 8,
    fontSize: 14,
    color: '#444',
    fontFamily: 'ms-regular',
    lineHeight: 20,
    textAlign: 'center',
  },
  noStoriesText: {
    fontSize: 16,
    fontFamily: 'ms-regular',
    textAlign: 'center',
    marginTop: 50,
    color: '#999',
  },
  likeRow: {
  flexDirection: 'row',
  alignItems: 'center',
  marginTop: 8,
  gap: 6,
},
likeText: {
  fontSize: 15,
  fontFamily: 'ms-light',
  color: '#6c63ff',
},
});
