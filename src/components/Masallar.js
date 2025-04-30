import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Masallar = ({ navigation }) => {
  const [masallar, setMasallar] = useState([]);

  useEffect(() => {
    const fetchMasallar = async () => {
      try {
        const response = await fetch('https://masal-backend-on7u.onrender.com/story/top-stories?limit=3');
        const data = await response.json();
        console.log('GELEN MASALLAR:', JSON.stringify(data, null, 2)); // 👈 BURAYA BAK
  
        if (Array.isArray(data)) {
          setMasallar(data);
        } else {
          setMasallar([]);
        }
      } catch (error) {
        console.error('Masallar alınamadı:', error);
        setMasallar([]);
      }
    };
  
    fetchMasallar();
  }, []);
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Masal Kütüphanesi</Text>
      <View style={styles.masallarRow}>
        {masallar.map((masal) => (
          <TouchableOpacity
            key={masal._id}
            style={[styles.masal, { backgroundColor: '#f0f0f0' }]}
            onPress={() =>
              navigation.navigate('StoryResult', {
                id: masal._id,
                title: masal.title,
                fullStory: masal.fullStory, // ❗ BU SATIR VAR MI? YOKSA EKLE ❗
                author: masal.userRef?.name || 'Bilinmeyen',
                theme: masal.theme,
                characters: masal.characters,
              })
            }
            
            
            
          >
            <View style={styles.plusBox}>
              <Text style={styles.plusText}>📘</Text>
            </View>
            <Text style={styles.text}>{masal.title}</Text>
            <Text style={styles.author}>{masal.userRef?.name || 'Bilinmeyen'}</Text>
          </TouchableOpacity>
        ))}

        {/* Tüm Masallar kutucuğu */}
        <TouchableOpacity
          style={[styles.masal, { backgroundColor: '#f0f0f0' }]}
          onPress={() => navigation.navigate('PublicStoriesPage')}
        >
          <View style={styles.plusBox}>
            <Text style={styles.plusText}>+</Text>
          </View>
          <Text style={styles.text}>Tüm Masalları Gör</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    marginTop: -15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    fontFamily: 'ms-bold',
  },
  masallarRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  masal: {
    borderRadius: 15,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    overflow: 'hidden',
    marginBottom: 10,
    width: 150,
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'ms-bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 3,
  },
  author: {
    fontSize: 12,
    color: '#6c63ff',
    textAlign: 'center',
    fontFamily: 'ms-light',
  },
  plusBox: {
    width: 100,
    height: 100,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  plusText: {
    fontSize: 40,
    color: '#6c63ff',
    fontFamily: 'ms-bold',
  },
});

export default Masallar;
