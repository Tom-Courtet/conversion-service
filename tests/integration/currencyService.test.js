const { convertCurrencyWithApi } = require('../../src/services/currencyService');
const exchangeRateApi = require('../../src/services/exchangeRateApi');

// Mock du module exchangeRateApi
jest.mock('../../src/services/exchangeRateApi');

describe('Service de conversion de devises avec API', () => {
  beforeEach(() => {
    // Réinitialisation des mocks avant chaque test
    jest.clearAllMocks();
  });

  test('devrait convertir correctement de EUR à USD en utilisant l\'API', async () => {
    // Configuration du mock pour retourner un taux fixe
    exchangeRateApi.getExchangeRate.mockResolvedValue(1.1);

    const result = await convertCurrencyWithApi('EUR', 'USD', 100);
    
    // Vérification du résultat
    expect(result).toBe(110);
    
    // Vérification que l'API a été appelée avec les bons paramètres
    expect(exchangeRateApi.getExchangeRate).toHaveBeenCalledWith('EUR', 'USD');
    expect(exchangeRateApi.getExchangeRate).toHaveBeenCalledTimes(1);
  });

  test('devrait convertir correctement de USD à GBP en utilisant l\'API', async () => {
    // Configuration du mock pour retourner un taux fixe
    exchangeRateApi.getExchangeRate.mockResolvedValue(0.8);

    const result = await convertCurrencyWithApi('USD', 'GBP', 100);
    
    // Vérification du résultat
    expect(result).toBe(80);
    
    // Vérification que l'API a été appelée avec les bons paramètres
    expect(exchangeRateApi.getExchangeRate).toHaveBeenCalledWith('USD', 'GBP');
    expect(exchangeRateApi.getExchangeRate).toHaveBeenCalledTimes(1);
  });

  test('devrait gérer les erreurs de l\'API', async () => {
    // Configuration du mock pour simuler une erreur
    exchangeRateApi.getExchangeRate.mockRejectedValue(new Error('Conversion non supportée'));

    // Vérification que l'erreur est propagée
    await expect(convertCurrencyWithApi('EUR', 'JPY', 100)).rejects.toThrow('Conversion non supportée');
    
    // Vérification que l'API a été appelée avec les bons paramètres
    expect(exchangeRateApi.getExchangeRate).toHaveBeenCalledWith('EUR', 'JPY');
    expect(exchangeRateApi.getExchangeRate).toHaveBeenCalledTimes(1);
  });

  test('devrait rejeter les montants négatifs', async () => {
    await expect(convertCurrencyWithApi('EUR', 'USD', -100)).rejects.toThrow('Le montant doit être un nombre positif');
    
    // Vérification que l'API n'a pas été appelée
    expect(exchangeRateApi.getExchangeRate).not.toHaveBeenCalled();
  });

  test('devrait rejeter les paramètres manquants', async () => {
    await expect(convertCurrencyWithApi()).rejects.toThrow('Paramètres manquants');
    await expect(convertCurrencyWithApi('EUR')).rejects.toThrow('Paramètres manquants');
    await expect(convertCurrencyWithApi('EUR', 'USD')).rejects.toThrow('Paramètres manquants');
    
    // Vérification que l'API n'a pas été appelée
    expect(exchangeRateApi.getExchangeRate).not.toHaveBeenCalled();
  });
});
