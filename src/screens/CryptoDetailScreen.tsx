import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    ScrollView,
    StatusBar,
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { CryptoService } from '../api/CryptoService';
import { Crypto } from '../models/Crypto';

type RootStackParamList = {
    CryptoDetail: { id: string };
};

type RouteParams = RouteProp<RootStackParamList, 'CryptoDetail'>;

export default function CryptoDetailScreen() {
    const route = useRoute<RouteParams>();
    const { id } = route.params;
    const [crypto, setCrypto] = useState<Crypto | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const load = async () => {
            setError(null);
            try {
                const data = await CryptoService.fetchCryptoById(id);
                setCrypto(data);
            } catch (e) {
                setError('Error al cargar los detalles de la criptomoneda.');
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [id]);

    if (loading)
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#007FFF" />
            </View>
        );

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#E6F0FF" />
            {error ? (
                <Text style={styles.errorText}>{error}</Text>
            ) : crypto ? (
                <View style={styles.card}>
                    <Text style={styles.title}>{crypto.name} ({crypto.symbol})</Text>

                    {/* Precio */}
                    <View style={styles.detailRow}>
                        <Text style={styles.label}>Precio (USD):</Text>
                        <Text style={styles.value}>${parseFloat(crypto.price_usd).toFixed(2)}</Text>
                    </View>

                    {/* Cambios porcentuales */}
                    <View style={styles.detailRow}>
                        <Text style={styles.label}>Cambio 1h:</Text>
                        <Text style={[styles.value, getColor(crypto.percent_change_1h)]}>
                            {crypto.percent_change_1h}%
                        </Text>
                    </View>

                    <View style={styles.detailRow}>
                        <Text style={styles.label}>Cambio 24h:</Text>
                        <Text style={[styles.value, getColor(crypto.percent_change_24h)]}>
                            {crypto.percent_change_24h}%
                        </Text>
                    </View>

                    <View style={styles.detailRow}>
                        <Text style={styles.label}>Cambio 7d:</Text>
                        <Text style={[styles.value, getColor(crypto.percent_change_7d)]}>
                            {crypto.percent_change_7d}%
                        </Text>
                    </View>

                    {/* Market Cap & Volumen */}
                    <View style={styles.detailRow}>
                        <Text style={styles.label}>Market Cap:</Text>
                        <Text style={styles.value}>
                            ${Number(crypto.market_cap_usd).toLocaleString()}
                        </Text>
                    </View>

                    <View style={styles.detailRow}>
                        <Text style={styles.label}>Volumen 24h:</Text>
                        <Text style={styles.value}>
                            ${Number(crypto.volume24).toLocaleString()}
                        </Text>
                    </View>

                    {/* Supply */}
                    <View style={styles.detailRow}>
                        <Text style={styles.label}>Suministro circulante:</Text>
                        <Text style={styles.value}>
                            {Number(crypto.csupply).toLocaleString()} {crypto.symbol}
                        </Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={styles.label}>Suministro total:</Text>
                        <Text style={styles.value}>
                            {Number(crypto.tsupply).toLocaleString()}
                        </Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={styles.label}>Suministro máximo:</Text>
                        <Text style={styles.value}>
                            {crypto.max_supply ? Number(crypto.max_supply).toLocaleString() : 'N/A'}
                        </Text>
                    </View>
                </View>
            ) : (
                <Text style={styles.errorText}>Error al mostrar los detalles.</Text>
            )}
        </ScrollView>
    );
}

// 🔧 Helper para color según ganancia/pérdida
const getColor = (change: string | number) => {
    const value = typeof change === 'string' ? parseFloat(change) : change;
    return {
        color: value >= 0 ? '#059669' : '#DC2626', // verde/rojo
    };
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F8FBFF',
        flexGrow: 1,
        padding: 20,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F8FBFF',
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 20,
        shadowColor: '#0059B2',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 6,
        elevation: 4,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: '#0059B2',
        marginBottom: 20,
        textAlign: 'center',
    },
    detailRow: {
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#003366',
        marginBottom: 4,
    },
    value: {
        fontSize: 18,
        color: '#007FFF',
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        fontSize: 16,
        marginTop: 20,
    },
});
