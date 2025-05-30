import React, { useEffect,useRef } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Platform,
  Animated,
} from 'react-native';

import HomePage from '../pages/HomePage';
import MasalGeneratePage from '../pages/MasalGeneratePage';
import PublicStoriesPage from '../pages/PublicStoriesPage';

const Tab = createBottomTabNavigator();

// 🔮 Özel FAB Button – focused durumuna göre scale animasyonu ve shadow
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
          focused && styles.fabButtonFocused, // Aktifse büyüsün ve renk değişsin
        ]}
      >
        {children}
      </View>
    </TouchableOpacity>
  );
};



const BottomTabs = () => {
  return (
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
            borderColor: '#6c63ff',     // 🔮 Mor çerçeve
            borderWidth: 0.6,
            },

        tabBarIcon: ({ color, size, focused }) => {
          let iconName = 'circle';
          let iconColor = color;

          if (route.name === 'Anasayfa') {
            iconName = 'home';
          } else if (route.name === 'Masal Oluştur') {
            iconName = 'edit-3';
            iconColor = '#fff';
          } else if (route.name === 'Keşfet') {
            iconName = 'book-open';
          }

          return (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Feather
                name={iconName}
                size={focused && route.name === 'Masal Oluştur' ? 28 : 24}
                color={iconColor}
              />
            </View>
          );
        },
      })}
    >
      <Tab.Screen name="Anasayfa" component={HomePage} />

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
};

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
  width: 95, // Büyüyor
  height: 95,
  borderRadius: 38,
  backgroundColor: '#3b30cc', // Yeni renk
  shadowOpacity: 0.4,
  shadowRadius: 12,
  elevation: 10,
},
});


export default BottomTabs;
