import { useEffect, useState } from 'react';
import { CryptoService } from '../api/CryptoService';
import { Crypto } from '../models/Crypto';

export function useCryptos() {
    const [cryptos, setCryptos] = useState<Crypto[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await CryptoService.fetchAll();
            setCryptos(data);
        } catch (e) {
            setError('Failed to fetch cryptos. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return { cryptos, loading, error, fetchData };
}