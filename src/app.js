const express = require('express');
const apiRoutes = require('./routes/api');

/**
 * Middleware pour gérer les erreurs
 */
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Erreur serveur' });
};

/**
 * Middleware pour gérer les routes non trouvées
 */
const notFoundHandler = (req, res) => {
  res.status(404).json({ error: 'Route non trouvée' });
};

// Création de l'application Express
const app = express();

// Middleware pour parser le JSON
app.use(express.json());

// Utilisation des routes API
app.use('/', apiRoutes);

// Route pour la page d'accueil
app.get('/', (req, res) => {
  res.json({
    message: 'Microservice de conversion et calculs financiers',
    endpoints: {
      convert: '/convert?from=EUR&to=USD&amount=100',
      tva: '/tva?ht=100&taux=20',
      remise: '/remise?prix=100&pourcentage=10'
    }
  });
});

// Route de test pour déclencher une erreur (uniquement en environnement de test)
if (process.env.NODE_ENV === 'test') {
  app.get('/test-error', (req, res, next) => {
    next(new Error('Test error'));
  });
}

// Middleware pour gérer les routes non trouvées
app.use(notFoundHandler);

// Middleware pour gérer les erreurs
app.use(errorHandler);

module.exports = app;
module.exports.errorHandler = errorHandler;
module.exports.notFoundHandler = notFoundHandler;
