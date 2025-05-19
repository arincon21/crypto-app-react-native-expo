import axios from 'axios';
import { Crypto } from '../models/Crypto';

const BASE_URL = 'https://api.coinlore.net/api';

export class CryptoService {
    static async fetchAll(): Promise<Crypto[]> {
        try {
            const response = await axios.get(`${BASE_URL}/tickers/?limit=10000`);
            return response.data.data.map((item: any) => new Crypto(item));
        } catch (error) {
            console.error('Error fetching all cryptos:', error);
            return [];
        }
    }

    static async fetchCryptoById(id: string): Promise<Crypto | null> {
        try {
            const response = await axios.get(`${BASE_URL}/ticker/?id=${id}`);
            const data = response.data[0];
            return data ? new Crypto(data) : null;
        } catch (error) {
            console.error(`Error fetching crypto with id ${id}:`, error);
            return null;
        }
    }
}