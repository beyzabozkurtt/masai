import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity, View, StyleSheet, Platform } from 'react-native';

import HomePage from '../pages/HomePage';
import MasalGeneratePage from '../pages/MasalGeneratePage';
import PublicStoriesPage from '../pages/PublicStoriesPage';
import CategoryStoriesPage from '../pages/CategoryStoriesPage';
import StoryResult from '../pages/StoryResult';
import MyStoriesPage from '../pages/MyStoriesPage';
import ProfilePage from '../pages/ProfilePage';
const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();

// ✅ Anasayfa + Kategori için Stack
const HomeStackScreen = () => (
  <HomeStack.Navigator screenOptions={{ headerShown: false }}>
    <HomeStack.Screen name="HomePage" component={HomePage} />
    <HomeStack.Screen name="CategoryStoriesPage" component={CategoryStoriesPage} />
    <HomeStack.Screen name="StoryResult" component={StoryResult} />
    <HomeStack.Screen name="MyStoriesPage" component={MyStoriesPage} />
    <HomeStack.Screen name="ProfilePage" component={ProfilePage} />
  </HomeStack.Navigator>
);

// ✅ FAB buton
const CustomTabBarButton = ({ children, onPress, accessibilityState }) => {
  const focused = accessibilityState?.selected;
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={styles.fabContainer}
    >
      <View
        style={[
          styles.fabButton,
          focused && styles.fabButtonFocused,
        ]}
      >
        {children}
      </View>
    </TouchableOpacity>
  );
};

const BottomTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarShowLabel: false,
      tabBarActiveTintColor: '#6c63ff',
      tabBarInactiveTintColor: '#aaa',
      tabBarStyle: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        height: 85,
        paddingBottom: 10,
        paddingTop: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 10,
        borderColor: '#6c63ff',
        borderWidth: 0.6,
      },
      tabBarIcon: ({ color, focused }) => {
        let iconName = 'circle';
        if (route.name === 'HomeStack') iconName = 'home';
        if (route.name === 'Masal Oluştur') iconName = 'edit-3';
        if (route.name === 'Keşfet') iconName = 'book-open';

        return (
          <Feather
            name={iconName}
            size={focused && route.name === 'Masal Oluştur' ? 28 : 24}
            color={route.name === 'Masal Oluştur' ? '#fff' : color}
          />
        );
      },
    })}
  >
    <Tab.Screen name="HomeStack" component={HomeStackScreen} />
    <Tab.Screen
      name="Masal Oluştur"
      component={MasalGeneratePage}
      options={{
        tabBarButton: (props) => <CustomTabBarButton {...props} />,
      }}
    />
    <Tab.Screen name="Keşfet" component={PublicStoriesPage} />
  </Tab.Navigator>
);

const styles = StyleSheet.create({
  fabContainer: {
    top: Platform.OS === 'ios' ? -20 : -15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  fabButton: {
    width: 65,
    height: 65,
    borderRadius: 35,
    backgroundColor: '#6c63ff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 6,
  },
  fabButtonFocused: {
    width: 95,
    height: 95,
    borderRadius: 48,
    backgroundColor: '#3b30cc',
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 10,
  },
});

export default BottomTabs;
