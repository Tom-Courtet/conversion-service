const request = require('supertest');
const app = require('../../src/app');

describe('API Routes', () => {
  describe('GET /', () => {
    test('devrait retourner la page d\'accueil', async () => {
      const response = await request(app).get('/');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('endpoints');
    });
  });

  describe('GET /convert', () => {
    test('devrait convertir correctement de EUR à USD', async () => {
      const response = await request(app).get('/convert?from=EUR&to=USD&amount=100');
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        from: 'EUR',
        to: 'USD',
        originalAmount: 100,
        convertedAmount: 110
      });
    });

    test('devrait convertir correctement de USD à GBP', async () => {
      const response = await request(app).get('/convert?from=USD&to=GBP&amount=100');
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        from: 'USD',
        to: 'GBP',
        originalAmount: 100,
        convertedAmount: 80
      });
    });

    test('devrait retourner une erreur 400 si les paramètres sont manquants', async () => {
      const response = await request(app).get('/convert?from=EUR&to=USD');
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });

    test('devrait retourner une erreur 400 si le montant n\'est pas un nombre', async () => {
      const response = await request(app).get('/convert?from=EUR&to=USD&amount=abc');
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });

    test('devrait retourner une erreur 400 si la conversion n\'est pas supportée', async () => {
      const response = await request(app).get('/convert?from=EUR&to=JPY&amount=100');
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('GET /tva', () => {
    test('devrait calculer correctement le montant TTC', async () => {
      const response = await request(app).get('/tva?ht=100&taux=20');
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        ht: 100,
        taux: 20,
        ttc: 120
      });
    });

    test('devrait retourner une erreur 400 si les paramètres sont manquants', async () => {
      const response = await request(app).get('/tva?ht=100');
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });

    test('devrait retourner une erreur 400 si les paramètres ne sont pas des nombres', async () => {
      const response = await request(app).get('/tva?ht=abc&taux=20');
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });

    test('devrait retourner une erreur 400 si le montant HT est négatif', async () => {
      const response = await request(app).get('/tva?ht=-100&taux=20');
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('GET /remise', () => {
    test('devrait calculer correctement le prix après remise', async () => {
      const response = await request(app).get('/remise?prix=100&pourcentage=10');
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        prixInitial: 100,
        pourcentage: 10,
        prixFinal: 90
      });
    });

    test('devrait retourner une erreur 400 si les paramètres sont manquants', async () => {
      const response = await request(app).get('/remise?prix=100');
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });

    test('devrait retourner une erreur 400 si les paramètres ne sont pas des nombres', async () => {
      const response = await request(app).get('/remise?prix=abc&pourcentage=10');
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });

    test('devrait retourner une erreur 400 si le prix est négatif', async () => {
      const response = await request(app).get('/remise?prix=-100&pourcentage=10');
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('Route non existante', () => {
    test('devrait retourner une erreur 404', async () => {
      const response = await request(app).get('/route-inexistante');
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error');
    });
  });
});
