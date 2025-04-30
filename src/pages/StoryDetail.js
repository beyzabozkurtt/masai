import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const StoryDetail = ({ route }) => {
  const { id } = route.params;
  const [story, setStory] = useState(null);

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const response = await fetch(`https://masal-backend-on7u.onrender.com/story/${id}`);
        const data = await response.json();
        setStory(data);
      } catch (error) {
        console.error('Masal alınamadı:', error);
      }
    };

    fetchStory();
  }, [id]);

  if (!story) {
    return <Text style={{ padding: 20 }}>Yükleniyor...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{story.title}</Text>
      <Text style={styles.author}>Yazan: {story.userRef?.name}</Text>
      <Text style={styles.fullStory}>{story.fullStory}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  author: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  fullStory: {
    fontSize: 16,
    lineHeight: 24,
  },
});

export default StoryDetail;
