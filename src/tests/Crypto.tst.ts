import { Crypto } from '../models/Crypto';

test('formatea el precio correctamente', () => {
    const crypto = new Crypto({ id: '1', symbol: 'BTC', name: 'Bitcoin', price_usd: '62000.1234' });
    expect(crypto.getFormattedPrice()).toBe('$62000.12');
});