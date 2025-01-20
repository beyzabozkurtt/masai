import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Font from 'expo-font';
import { View, ActivityIndicator } from 'react-native';
import SplashScreen from '../pages/SplashScreen';
import HomePage from '../pages/HomePage';
import MasalGeneratePage from '../pages/MasalGeneratePage';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const loadFonts = async () => {
    await Font.loadAsync({
      'ms-regular': require('../assets/fonts/ms-regular.ttf'),
      'ms-bold': require('../assets/fonts/ms-bold.ttf'),
      'ms-light': require('../assets/fonts/ms-light.ttf'),
      'ms-italic': require('../assets/fonts/ms-italic.ttf'),
    });
    setFontsLoaded(true);
  };

  useEffect(() => {
    loadFonts();
  }, []);

  // Eğer fontlar yüklenmediyse bir yükleme ekranı göster
  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#6c63ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomePage}
          options={{
            headerTitle: 'Anasayfa',
            headerStyle: { backgroundColor: '#6c63ff' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontFamily: 'ms-bold' }, // Font burada kullanılıyor
          }}
        />
        <Stack.Screen
          name="MasalGeneratePage"
          component={MasalGeneratePage}
          options={{
            headerTitle: 'Masal Oluştur',
            headerTitleStyle: { fontFamily: 'ms-regular' }, // Font burada kullanılıyor
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
