import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const boxWidth = windowWidth * 0.24;  // yaklaşık %24 genişlik
const boxHeight = boxWidth * 1.1;     // oranlı yükseklik

const categories = [
  { title: 'Macera' },
  { title: 'Dostluk' },
  { title: 'Doğa' },
  { title: 'Bilgelik' },
  { title: 'Hayvanlar' },
  { title: 'Aile' },
  { title: 'Sihir' },
  { title: 'Keşif' },
];

const Categories = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}></Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesRow}
      >
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.category, { width: boxWidth, height: boxHeight }]}
            onPress={() =>
  navigation.navigate('HomeStack', {
  screen: 'CategoryStoriesPage',
  params: { theme: category.title },
})
}
          >
            <Text style={styles.text}>{category.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
    marginTop: -20,
    marginLeft: -4,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    fontFamily: 'ms-bold',
  },
  categoriesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  category: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e8f5e9',
    paddingVertical: 10,
    borderRadius: 15,
    marginRight: 10,
  },
  text: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'ms-bold',
  },
});

export default Categories;
