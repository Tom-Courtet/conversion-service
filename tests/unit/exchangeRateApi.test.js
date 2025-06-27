const { getExchangeRate, RATES } = require('../../src/services/exchangeRateApi');

describe('Service d\'API de taux de change', () => {
  describe('getExchangeRate', () => {
    test('devrait retourner le taux de change correct de EUR à USD', async () => {
      const rate = await getExchangeRate('EUR', 'USD');
      expect(rate).toBe(1.1);
    });

    test('devrait retourner le taux de change correct de USD à GBP', async () => {
      const rate = await getExchangeRate('USD', 'GBP');
      expect(rate).toBe(0.8);
    });

    test('devrait retourner le taux de change correct de USD à EUR', async () => {
      const rate = await getExchangeRate('USD', 'EUR');
      expect(rate).toBeCloseTo(1 / 1.1);
    });

    test('devrait retourner le taux de change correct de GBP à USD', async () => {
      const rate = await getExchangeRate('GBP', 'USD');
      expect(rate).toBeCloseTo(1 / 0.8);
    });

    test('devrait être insensible à la casse pour les devises', async () => {
      const rate = await getExchangeRate('eur', 'usd');
      expect(rate).toBe(1.1);
    });

    test('devrait rejeter les devises non supportées', async () => {
      await expect(getExchangeRate('EUR', 'JPY')).rejects.toThrow('Conversion de EUR vers JPY non supportée');
    });

    test('devrait rejeter les devises source non supportées', async () => {
      await expect(getExchangeRate('JPY', 'USD')).rejects.toThrow('Conversion de JPY vers USD non supportée');
    });

    test('devrait rejeter si les devises sont manquantes', async () => {
      await expect(getExchangeRate()).rejects.toThrow('Devises manquantes');
      await expect(getExchangeRate('EUR')).rejects.toThrow('Devises manquantes');
      await expect(getExchangeRate(null, 'USD')).rejects.toThrow('Devises manquantes');
      await expect(getExchangeRate('EUR', null)).rejects.toThrow('Devises manquantes');
    });
  });

  describe('RATES', () => {
    test('devrait avoir les taux de change corrects', () => {
      expect(RATES.EUR.USD).toBe(1.1);
      expect(RATES.USD.GBP).toBe(0.8);
      expect(RATES.USD.EUR).toBeCloseTo(1 / 1.1);
      expect(RATES.GBP.USD).toBeCloseTo(1 / 0.8);
    });
  });
});
