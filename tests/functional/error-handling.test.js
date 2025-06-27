const request = require('supertest');
const express = require('express');

describe('Middleware de gestion des erreurs', () => {
  // Définir NODE_ENV comme 'test' pour activer la route de test d'erreur
  process.env.NODE_ENV = 'test';
  
  let app;
  let consoleErrorSpy;

  beforeEach(() => {
    // Espionner console.error pour éviter les logs pendant les tests
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    // Recréer l'application pour chaque test pour éviter les effets de bord
    jest.resetModules();
    app = require('../../src/app');
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  test('devrait gérer les erreurs serveur avec un code 500', async () => {
    // Utiliser la route de test d'erreur définie dans app.js
    const response = await request(app).get('/test-error');
    
    // Vérifier que l'erreur est bien gérée
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Erreur serveur' });
    expect(consoleErrorSpy).toHaveBeenCalled();
  });

  test('devrait retourner 404 pour les routes non trouvées', async () => {
    const response = await request(app).get('/route-qui-nexiste-pas-' + Date.now());
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'Route non trouvée' });
  });

  test('devrait tester directement le middleware errorHandler', () => {
    const { errorHandler } = require('../../src/app');
    
    // Créer des mocks pour req, res et next
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const next = jest.fn();
    const err = new Error('Test error');
    
    // Appeler le middleware
    errorHandler(err, req, res, next);
    
    // Vérifier que le middleware a bien fonctionné
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Erreur serveur' });
    expect(consoleErrorSpy).toHaveBeenCalled();
  });

  test('devrait tester directement le middleware notFoundHandler', () => {
    const { notFoundHandler } = require('../../src/app');
    
    // Créer des mocks pour req et res
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    
    // Appeler le middleware
    notFoundHandler(req, res);
    
    // Vérifier que le middleware a bien fonctionné
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Route non trouvée' });
  });
});
