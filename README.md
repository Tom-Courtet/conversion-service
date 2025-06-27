# Microservice de conversion et calculs financiers

Ce microservice expose une API REST permettant d'effectuer des conversions de devises et des calculs financiers simples.

## Fonctionnalités

- Conversions de devises (EUR ↔ USD, USD ↔ GBP)
- Calculs financiers (TVA, remise)

## Routes disponibles

- `GET /convert?from=EUR&to=USD&amount=100` - Conversion de devises
- `GET /tva?ht=100&taux=20` - Calcul de TVA
- `GET /remise?prix=100&pourcentage=10` - Application d'une remise

## Installation

```bash
npm install
```

## Démarrage du serveur

```bash
npm start
```

Pour le développement avec rechargement automatique :

```bash
npm run dev
```

## Tests

Exécution de tous les tests :

```bash
npm test
```

Tests unitaires :

```bash
npm run test:unit
```

Tests fonctionnels :

```bash
npm run test:functional
```

Tests d'intégration :

```bash
npm run test:integration
```

Tests end-to-end :

```bash
npm run test:e2e
```

Rapport de couverture :

```bash
npm run test:coverage
```

## Taux de conversion (fixes)

- 1 EUR = 1.1 USD
- 1 USD = 0.8 GBP
