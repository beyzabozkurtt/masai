import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Image } from 'react-native';


const windowWidth = Dimensions.get('window').width;
const cardWidth = windowWidth * 0.35;
const cardHeight = cardWidth * 1.5;

const Masallar = ({ navigation,refreshFlag }) => {
   const [masallar, setMasallar] = useState([]);

  const fetchMasallar = async () => {
    try {
      const response = await fetch('https://masal-backend-on7u.onrender.com/story/public-stories?limit=10');
      const data = await response.json();

      const filtered = Array.isArray(data)
        ? data.filter(
            masal =>
              masal.imageUrl &&
              typeof masal.imageUrl === 'string' &&
              masal.imageUrl.startsWith('https://res.cloudinary.com')
          )
        : [];

      const firstThree = filtered.slice(0, 3);
      setMasallar(firstThree);

      firstThree.forEach((masal) => {
        console.log('✅ MASAL:', masal.title, masal.imageUrl);
      });

    } catch (error) {
      console.error('Masallar alınamadı:', error);
      setMasallar([]);
    }
  };

  useEffect(() => {
    fetchMasallar(); // sayfa ilk açıldığında yükle
  }, []);

  useEffect(() => {
  if (refreshFlag) {
    const reload = async () => {
      await fetchMasallar();
    };
    reload();
  }
}, [refreshFlag]);


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Masal Kütüphanesi</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {[...masallar, { _id: 'see-all' }].map((masal) => (
          <TouchableOpacity
            key={masal._id}
            style={styles.masal}
            onPress={() =>
              masal._id === 'see-all'
                ? navigation.navigate('Keşfet')
                : navigation.navigate('HomeStack', {
                    screen: 'StoryResult',
                    params: {
                      id: masal._id,
                      title: masal.title,
                      fullStory: masal.fullStory,
                      author: masal.userRef?.name || 'Bilinmeyen',
                      theme: masal.theme,
                      characters: masal.characters,
                      imageUrl: masal.imageUrl || null,
                    },
                  })
            }
          >
            <View style={styles.plusBox}>
              {masal.imageUrl ? (
                  <Image
                      source={{ uri: masal.imageUrl }}
                      style={styles.imageStyle}
                      resizeMode="cover"
                      onError={() => console.log('Resim yüklenemedi:', masal.title)}
                  />
              ) : (
                  <Text style={styles.plusText}>
                    {masal._id === 'see-all' ? '+' : '📘'}
                  </Text>
              )}
            </View>


            <Text style={styles.text}>
              {masal._id === 'see-all' ? 'Tüm Masalları Gör' : masal.title}
            </Text>
            {masal._id !== 'see-all' && (
              <Text style={styles.author}>
                {masal.userRef?.name || 'Bilinmeyen'}
              </Text>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 0,
    marginTop: -10,
    marginLeft: -4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6c63ff',
    marginBottom: 15,
    marginLeft: 10,
    fontFamily: 'ms-bold',
  },
  scrollContainer: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    gap: 15,
  },
  masal: {
    width: cardWidth,
    height: cardHeight,
    borderRadius: 15,
    padding: 0,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#f0f0f0',
  },
  plusBox: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 12,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    overflow: 'hidden'

  },
  plusText: {
    fontSize: 36,
    color: '#6c63ff',
    fontFamily: 'ms-bold',
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'ms-bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 4,
  },
  author: {
    fontSize: 12,
    color: '#6c63ff',
    textAlign: 'center',
    fontFamily: 'ms-light',
  },

  imageStyle: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },

});

export default Masallar;
