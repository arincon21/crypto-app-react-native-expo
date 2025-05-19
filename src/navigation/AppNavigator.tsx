import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import CryptoListScreen from '../screens/CryptoListScreen';
import CryptoDetailScreen from '../screens/CryptoDetailScreen';


export type RootStackParamList = {
    Welcome: undefined;
    CryptoList: undefined;
    CryptoDetail: { id: string };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
    return (
        <Stack.Navigator
            initialRouteName="Welcome"
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#E6F0FF',
                    shadowColor: 'transparent',
                    elevation: 0,
                },
                headerTitleAlign: 'center',
                headerTintColor: '#0059B2',
                headerTitleStyle: {
                    fontSize: 20,
                    fontWeight: '600',
                },
                cardStyle: {
                    backgroundColor: '#F8FBFF',
                },
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
        >
            <Stack.Screen
                name="Welcome"
                component={require('../screens/WelcomeScreen').default}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="CryptoList"
                component={CryptoListScreen}
                options={{ title: 'Criptomonedas' }}
            />
            <Stack.Screen
                name="CryptoDetail"
                component={CryptoDetailScreen}
                options={{ title: 'Detalles' }}
            />
        </Stack.Navigator>
    );
}
