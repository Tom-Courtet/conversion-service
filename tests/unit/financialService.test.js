const { calculateTTC, applyDiscount } = require('../../src/services/financialService');

describe('Service de calculs financiers', () => {
  describe('calculateTTC', () => {
    test('devrait calculer correctement le montant TTC', () => {
      expect(calculateTTC(100, 20)).toBe(120);
    });

    test('devrait gérer les montants décimaux', () => {
      expect(calculateTTC(50.5, 20)).toBe(60.6);
    });

    test('devrait gérer les taux décimaux', () => {
      expect(calculateTTC(100, 5.5)).toBe(105.5);
    });

    test('devrait accepter les paramètres sous forme de chaînes', () => {
      expect(calculateTTC('100', '20')).toBe(120);
    });

    test('devrait rejeter les montants HT négatifs', () => {
      expect(() => calculateTTC(-100, 20)).toThrow('Le montant HT doit être positif');
    });

    test('devrait rejeter les taux négatifs', () => {
      expect(() => calculateTTC(100, -20)).toThrow('Le taux de TVA doit être positif');
    });

    test('devrait rejeter les paramètres non numériques', () => {
      expect(() => calculateTTC('abc', 20)).toThrow('Les paramètres doivent être des nombres');
      expect(() => calculateTTC(100, 'abc')).toThrow('Les paramètres doivent être des nombres');
    });

    test('devrait rejeter les paramètres manquants', () => {
      expect(() => calculateTTC()).toThrow('Paramètres manquants');
      expect(() => calculateTTC(100)).toThrow('Paramètres manquants');
    });
  });

  describe('applyDiscount', () => {
    test('devrait calculer correctement le prix après remise', () => {
      expect(applyDiscount(100, 10)).toBe(90);
    });

    test('devrait gérer les prix décimaux', () => {
      expect(applyDiscount(50.5, 10)).toBe(45.45);
    });

    test('devrait gérer les pourcentages décimaux', () => {
      expect(applyDiscount(100, 5.5)).toBe(94.5);
    });

    test('devrait accepter les paramètres sous forme de chaînes', () => {
      expect(applyDiscount('100', '10')).toBe(90);
    });

    test('devrait rejeter les prix négatifs', () => {
      expect(() => applyDiscount(-100, 10)).toThrow('Le prix doit être positif');
    });

    test('devrait rejeter les pourcentages négatifs', () => {
      expect(() => applyDiscount(100, -10)).toThrow('Le pourcentage de remise doit être compris entre 0 et 100');
    });

    test('devrait rejeter les pourcentages supérieurs à 100', () => {
      expect(() => applyDiscount(100, 110)).toThrow('Le pourcentage de remise doit être compris entre 0 et 100');
    });

    test('devrait rejeter les paramètres non numériques', () => {
      expect(() => applyDiscount('abc', 10)).toThrow('Les paramètres doivent être des nombres');
      expect(() => applyDiscount(100, 'abc')).toThrow('Les paramètres doivent être des nombres');
    });

    test('devrait rejeter les paramètres manquants', () => {
      expect(() => applyDiscount()).toThrow('Paramètres manquants');
      expect(() => applyDiscount(100)).toThrow('Paramètres manquants');
    });
  });
});
