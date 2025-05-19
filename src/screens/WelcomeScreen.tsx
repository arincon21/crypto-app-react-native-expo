import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type NavigationProp = StackNavigationProp<RootStackParamList, 'CryptoList'>;

export default function WelcomeScreen() {
    const navigation = useNavigation<NavigationProp>();
    const scale = new Animated.Value(1);

    const handlePress = () => {
        Animated.sequence([
            Animated.spring(scale, {
                toValue: 0.96,
                useNativeDriver: true,
            }),
            Animated.spring(scale, {
                toValue: 1,
                friction: 3,
                tension: 100,
                useNativeDriver: true,
            }),
        ]).start(() => {
            navigation.navigate('CryptoList');
        });
    };

    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/images/crypto-hero.png')}
                style={styles.image}
                resizeMode="contain"
            />
            <Text style={styles.title}>CryptoTracker</Text>
            <Text style={styles.subtitle}>
                Explora el mundo de las criptomonedas en tiempo real.
            </Text>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('CryptoList')}
            >
                <Text style={styles.buttonText}>Comenzar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FBFF',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    image: {
        width: 180,
        height: 180,
        marginBottom: 30,
    },
    title: {
        fontSize: 32,
        fontWeight: '700',
        color: '#0059B2',
        marginBottom: 16,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#003366',
        textAlign: 'center',
        marginBottom: 40,
    },
    button: {
        backgroundColor: '#007FFF',
        paddingVertical: 14,
        paddingHorizontal: 32,
        borderRadius: 10,
        elevation: 3,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});
