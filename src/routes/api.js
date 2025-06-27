const express = require('express');
const router = express.Router();
const { convertCurrency } = require('../services/conversionService');
const { calculateTTC, applyDiscount } = require('../services/financialService');

/**
 * Route pour la conversion de devises
 * GET /convert?from=EUR&to=USD&amount=100
 */
router.get('/convert', (req, res) => {
  try {
    const { from, to, amount } = req.query;
    
    if (!from || !to || !amount) {
      return res.status(400).json({ error: 'Paramètres manquants' });
    }
    
    const numAmount = Number(amount);
    
    if (isNaN(numAmount)) {
      return res.status(400).json({ error: 'Le montant doit être un nombre' });
    }
    
    const convertedAmount = convertCurrency(from, to, numAmount);
    
    return res.json({
      from,
      to,
      originalAmount: numAmount,
      convertedAmount
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

/**
 * Route pour le calcul de TVA
 * GET /tva?ht=100&taux=20
 */
router.get('/tva', (req, res) => {
  try {
    const { ht, taux } = req.query;
    
    if (!ht || !taux) {
      return res.status(400).json({ error: 'Paramètres manquants' });
    }
    
    const numHt = Number(ht);
    const numTaux = Number(taux);
    
    if (isNaN(numHt) || isNaN(numTaux)) {
      return res.status(400).json({ error: 'Les paramètres doivent être des nombres' });
    }
    
    const ttc = calculateTTC(numHt, numTaux);
    
    return res.json({
      ht: numHt,
      taux: numTaux,
      ttc
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

/**
 * Route pour l'application d'une remise
 * GET /remise?prix=100&pourcentage=10
 */
router.get('/remise', (req, res) => {
  try {
    const { prix, pourcentage } = req.query;
    
    if (!prix || !pourcentage) {
      return res.status(400).json({ error: 'Paramètres manquants' });
    }
    
    const numPrix = Number(prix);
    const numPourcentage = Number(pourcentage);
    
    if (isNaN(numPrix) || isNaN(numPourcentage)) {
      return res.status(400).json({ error: 'Les paramètres doivent être des nombres' });
    }
    
    const prixFinal = applyDiscount(numPrix, numPourcentage);
    
    return res.json({
      prixInitial: numPrix,
      pourcentage: numPourcentage,
      prixFinal
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

module.exports = router;
