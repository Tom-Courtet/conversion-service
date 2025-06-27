const request = require('supertest');
const app = require('../../src/app');

describe('Tests End-to-End', () => {
  test('Scénario complet: convertir un prix puis calculer la TVA du montant converti', async () => {
    // Étape 1: Conversion de 100 EUR en USD
    const conversionResponse = await request(app).get('/convert?from=EUR&to=USD&amount=100');
    expect(conversionResponse.status).toBe(200);
    expect(conversionResponse.body).toHaveProperty('convertedAmount');
    
    // Récupération du montant converti
    const convertedAmount = conversionResponse.body.convertedAmount;
    expect(convertedAmount).toBe(110);
    
    // Étape 2: Calcul de la TVA sur le montant converti
    const tvaResponse = await request(app).get(`/tva?ht=${convertedAmount}&taux=20`);
    expect(tvaResponse.status).toBe(200);
    expect(tvaResponse.body).toHaveProperty('ttc');
    
    // Vérification du montant TTC
    const ttcAmount = tvaResponse.body.ttc;
    expect(ttcAmount).toBe(132); // 110 + 20% = 132
  });

  test('Scénario complet: convertir un prix puis appliquer une remise', async () => {
    // Étape 1: Conversion de 100 USD en GBP
    const conversionResponse = await request(app).get('/convert?from=USD&to=GBP&amount=100');
    expect(conversionResponse.status).toBe(200);
    expect(conversionResponse.body).toHaveProperty('convertedAmount');
    
    // Récupération du montant converti
    const convertedAmount = conversionResponse.body.convertedAmount;
    expect(convertedAmount).toBe(80);
    
    // Étape 2: Application d'une remise de 10% sur le montant converti
    const remiseResponse = await request(app).get(`/remise?prix=${convertedAmount}&pourcentage=10`);
    expect(remiseResponse.status).toBe(200);
    expect(remiseResponse.body).toHaveProperty('prixFinal');
    
    // Vérification du prix final
    const prixFinal = remiseResponse.body.prixFinal;
    expect(prixFinal).toBe(72); // 80 - 10% = 72
  });

  test('Scénario complet avec chaîne de conversions: EUR -> USD -> GBP', async () => {
    // Étape 1: Conversion de 100 EUR en USD
    const conversionEurUsdResponse = await request(app).get('/convert?from=EUR&to=USD&amount=100');
    expect(conversionEurUsdResponse.status).toBe(200);
    
    // Récupération du montant converti EUR -> USD
    const amountUsd = conversionEurUsdResponse.body.convertedAmount;
    expect(amountUsd).toBe(110);
    
    // Étape 2: Conversion du montant USD en GBP
    const conversionUsdGbpResponse = await request(app).get(`/convert?from=USD&to=GBP&amount=${amountUsd}`);
    expect(conversionUsdGbpResponse.status).toBe(200);
    
    // Vérification du montant final EUR -> USD -> GBP
    const amountGbp = conversionUsdGbpResponse.body.convertedAmount;
    expect(amountGbp).toBe(88); // 110 USD * 0.8 = 88 GBP
  });
});
