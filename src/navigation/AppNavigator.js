import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../pages/SplashScreen';
import HomePage from '../pages/HomePage';
import MasalGeneratePage from '../pages/MasalGeneratePage';

const Stack = createStackNavigator();

const AppNavigator = () => {
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
                    options={{ headerTitle: 'Anasayfa', headerStyle: { backgroundColor: '#6c63ff' }, headerTintColor: '#fff' }}
                />
                <Stack.Screen
                    name="MasalGeneratePage"
                    component={MasalGeneratePage}
                    options={{ headerTitle: 'Masal Oluştur' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
