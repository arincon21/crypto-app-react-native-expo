import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    TextInput,
    ActivityIndicator,
    StyleSheet,
    StatusBar,
    Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCryptos } from '../hooks/useCryptos';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Feather } from '@expo/vector-icons';

type NavigationProp = StackNavigationProp<RootStackParamList, 'CryptoList'>;

export default function CryptoListScreen() {
    const navigation = useNavigation<NavigationProp>();
    const { cryptos, loading, error, fetchData } = useCryptos();
    const [search, setSearch] = useState('');
    const listRef = useRef<FlatList>(null);

    const [showScrollTop, setShowScrollTop] = useState(false);
    const scrollTopAnim = useRef(new Animated.Value(0)).current;

    const filteredCryptos = cryptos.filter((crypto) =>
        crypto.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#E6F0FF" />
            <Text style={styles.title}>🔍 Seguimiento de Criptomonedas</Text>

            <TextInput
                placeholder="Buscar criptomoneda..."
                value={search}
                onChangeText={setSearch}
                style={styles.input}
                placeholderTextColor="#007FFF"
            />

            {error && <Text style={styles.errorText}>{error}</Text>}

            {loading ? (
                <ActivityIndicator size="large" color="#007FFF" style={{ marginTop: 20 }} />
            ) : (
                <FlatList
                    ref={listRef}
                    data={filteredCryptos}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.item}
                            onPress={() => navigation.navigate('CryptoDetail', { id: item.id })}
                        >
                            <View style={styles.itemHeader}>
                                <Text style={styles.itemTitle}>
                                    {item.name} ({item.symbol})
                                </Text>
                                <Text style={styles.rank}>#{item.rank}</Text>
                            </View>

                            <Text style={styles.itemPrice}>${parseFloat(item.price_usd).toFixed(2)}</Text>

                            <Text
                                style={[
                                    styles.change,
                                    {
                                        color:
                                            parseFloat(item.percent_change_24h) >= 0 ? '#059669' : '#DC2626',
                                    },
                                ]}
                            >
                                {item.percent_change_24h}% (24h)
                            </Text>
                        </TouchableOpacity>
                    )}
                    onScroll={(e) => {
                        const offsetY = e.nativeEvent.contentOffset.y;
                        const shouldShow = offsetY > 300;

                        if (shouldShow !== showScrollTop) {
                            setShowScrollTop(shouldShow);
                            Animated.timing(scrollTopAnim, {
                                toValue: shouldShow ? 1 : 0,
                                duration: 200,
                                useNativeDriver: true,
                            }).start();
                        }
                    }}
                    scrollEventThrottle={16}
                    refreshing={loading}
                    onRefresh={fetchData}
                    contentContainerStyle={{ paddingBottom: 100 }}
                />
            )}

            <Animated.View
                style={[
                    styles.scrollTopButton,
                    {
                        opacity: scrollTopAnim,
                        transform: [
                            {
                                scale: scrollTopAnim.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0.7, 1],
                                }),
                            },
                        ],
                    },
                ]}
                pointerEvents={showScrollTop ? 'auto' : 'none'}
            >
                <TouchableOpacity
                    onPress={() => listRef.current?.scrollToOffset({ offset: 0, animated: true })}
                >
                    <Feather name="arrow-up-circle" size={28} color="white" />
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FBFF',
        paddingHorizontal: 16,
        paddingTop: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: '#0059B2',
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        backgroundColor: '#E6F0FF',
        borderRadius: 12,
        padding: 12,
        fontSize: 16,
        color: '#003366',
        borderColor: '#007FFF',
        borderWidth: 1,
        marginBottom: 16,
    },
    item: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#0059B2',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 3,
    },
    itemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 6,
    },
    itemTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#003366',
    },
    rank: {
        fontSize: 14,
        fontWeight: '500',
        color: '#6B7280',
    },
    itemPrice: {
        fontSize: 16,
        color: '#007FFF',
        marginTop: 4,
    },
    change: {
        fontSize: 14,
        marginTop: 4,
        fontWeight: '500',
    },
    errorText: {
        color: 'red',
        marginBottom: 16,
        textAlign: 'center',
    },
    scrollTopButton: {
        position: 'absolute',
        bottom: 24,
        right: 24,
        backgroundColor: '#007FFF',
        borderRadius: 30,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#0059B2',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    scrollTopText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },
});
