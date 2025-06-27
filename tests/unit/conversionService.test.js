const { convertCurrency, EXCHANGE_RATES } = require('../../src/services/conversionService');

describe('Service de conversion de devises', () => {
  describe('convertCurrency', () => {
    test('devrait convertir correctement de EUR à USD', () => {
      expect(convertCurrency('EUR', 'USD', 100)).toBe(110);
    });

    test('devrait convertir correctement de USD à GBP', () => {
      expect(convertCurrency('USD', 'GBP', 100)).toBe(80);
    });

    test('devrait convertir correctement de USD à EUR', () => {
      expect(convertCurrency('USD', 'EUR', 110)).toBe(100);
    });

    test('devrait convertir correctement de GBP à USD', () => {
      expect(convertCurrency('GBP', 'USD', 80)).toBe(100);
    });

    test('devrait gérer les montants décimaux', () => {
      expect(convertCurrency('EUR', 'USD', 50.5)).toBe(55.55);
    });

    test('devrait être insensible à la casse pour les devises', () => {
      expect(convertCurrency('eur', 'usd', 100)).toBe(110);
    });

    test('devrait rejeter les montants négatifs', () => {
      expect(() => convertCurrency('EUR', 'USD', -100)).toThrow('Le montant doit être un nombre positif');
    });

    test('devrait rejeter les montants non numériques', () => {
      expect(() => convertCurrency('EUR', 'USD', 'abc')).toThrow('Le montant doit être un nombre positif');
    });

    test('devrait rejeter les devises non supportées', () => {
      expect(() => convertCurrency('EUR', 'JPY', 100)).toThrow('Conversion de EUR vers JPY non supportée');
    });

    test('devrait rejeter les paramètres manquants', () => {
      expect(() => convertCurrency()).toThrow('Paramètres manquants');
      expect(() => convertCurrency('EUR')).toThrow('Paramètres manquants');
      expect(() => convertCurrency('EUR', 'USD')).toThrow('Paramètres manquants');
    });
  });

  describe('EXCHANGE_RATES', () => {
    test('devrait avoir les taux de change corrects', () => {
      expect(EXCHANGE_RATES.EUR.USD).toBe(1.1);
      expect(EXCHANGE_RATES.USD.GBP).toBe(0.8);
      expect(EXCHANGE_RATES.USD.EUR).toBeCloseTo(1 / 1.1);
      expect(EXCHANGE_RATES.GBP.USD).toBeCloseTo(1 / 0.8);
    });
  });
});
