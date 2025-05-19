import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Crypto } from '../models/Crypto';

type Props = {
    crypto: Crypto;
    onPress: () => void;
};

export default function CryptoCard({ crypto, onPress }: Props) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.card}>
            <View style={styles.header}>
                <Text style={styles.name}>{crypto.name}</Text>
                <Text style={styles.symbol}>({crypto.symbol})</Text>
            </View>
            <Text style={styles.price}>{crypto.getFormattedPrice()}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#0059B2',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 4, // sombra en Android
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
    },
    name: {
        fontSize: 18,
        fontWeight: '600',
        color: '#003366',
        marginRight: 8,
    },
    symbol: {
        fontSize: 14,
        color: '#007FFF',
    },
    price: {
        fontSize: 16,
        fontWeight: '500',
        color: '#007FFF',
    },
});
