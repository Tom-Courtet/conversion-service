/**
 * Service d'API de taux de change
 * Ce service est utilisé pour récupérer les taux de change
 * Il sera mocké dans les tests d'intégration
 */

// Taux de change fixes
const RATES = {
  EUR: {
    USD: 1.1,
  },
  USD: {
    GBP: 0.8,
    EUR: 1 / 1.1,
  },
  GBP: {
    USD: 1 / 0.8,
  }
};

/**
 * Récupère le taux de change entre deux devises
 * @param {string} from - Devise source
 * @param {string} to - Devise cible
 * @returns {Promise<number>} - Taux de change
 */
async function getExchangeRate(from, to) {
  // Vérification des devises supportées
  if (!from || !to) {
    throw new Error('Devises manquantes');
  }
  
  // Normalisation des devises
  from = from.toUpperCase();
  to = to.toUpperCase();
  
  // Vérification de l'existence des taux
  if (!RATES[from] || !RATES[from][to]) {
    throw new Error(`Conversion de ${from} vers ${to} non supportée`);
  }

  return RATES[from][to];
}

module.exports = {
  getExchangeRate,
  RATES
};
