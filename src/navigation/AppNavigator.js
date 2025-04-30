import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Font from 'expo-font';
import { View, ActivityIndicator } from 'react-native';

// Pages
import SplashScreen from '../pages/SplashScreen';
import HomePage from '../pages/HomePage';
import MasalGeneratePage from '../pages/MasalGeneratePage';
import RegisterScreen from '../pages/RegisterScreen';
import LoginScreen from '../pages/LoginScreen';
import StoryResult from '../pages/StoryResult';
import StoryDetail from '../pages/StoryDetail'; // ✅ Yeni sayfa eklendi
import PublicStoriesPage from '../pages/PublicStoriesPage';
import CategoryStoriesPage from '../pages/CategoryStoriesPage';

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
          name="RegisterScreen"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomePage}
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="MasalGeneratePage"
          component={MasalGeneratePage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="StoryResult"
          component={StoryResult}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="StoryDetail" // ✅ Eklendi
          component={StoryDetail}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PublicStoriesPage"
          component={PublicStoriesPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CategoryStoriesPage"
          component={CategoryStoriesPage}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
