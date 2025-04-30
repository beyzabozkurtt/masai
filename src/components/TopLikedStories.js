import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';

const TopLikedStories = ({ navigation }) => {
  const [topStories, setTopStories] = useState([]);

  useEffect(() => {
    const fetchTopStories = async () => {
      try {
        const response = await fetch('https://masal-backend-on7u.onrender.com/story/top-stories?limit=3');

        const data = await response.json();
        setTopStories(data);
      } catch (error) {
        console.error('Top masallar alınamadı:', error);
      }
    };

    fetchTopStories();
  }, []);

  const handlePress = (storyId) => {
    navigation.navigate('StoryDetail', { id: storyId });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>En Çok Beğenilen Masallar</Text>
      <FlatList
        horizontal
        data={topStories}
        keyExtractor={(item) => item._id}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => handlePress(item._id)}>
            <Image
              source={{ uri: item.imageUrl || 'https://via.placeholder.com/150' }}
              style={styles.image}
            />
            <Text style={styles.storyTitle}>{item.title}</Text>
            <Text style={styles.author}>{item.userRef?.name || 'Bilinmeyen'}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  card: {
    marginRight: 12,
    width: 140,
  },
  image: {
    width: 140,
    height: 140,
    borderRadius: 12,
  },
  storyTitle: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5,
  },
  author: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
  },
});

export default TopLikedStories;
