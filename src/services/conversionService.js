/**
 * Service de conversion de devises
 * Taux fixes:
 * - 1 EUR = 1.1 USD
 * - 1 USD = 0.8 GBP
 */

const EXCHANGE_RATES = {
  EUR: {
    USD: 1.1,
  },
  USD: {
    GBP: 0.8,
    EUR: 1 / 1.1, // Taux inverse pour la conversion USD -> EUR
  },
  GBP: {
    USD: 1 / 0.8, // Taux inverse pour la conversion GBP -> USD
  }
};

/**
 * Convertit un montant d'une devise à une autre
 * @param {string} from - Devise source (EUR, USD, GBP)
 * @param {string} to - Devise cible (EUR, USD, GBP)
 * @param {number} amount - Montant à convertir
 * @returns {number} - Montant converti
 * @throws {Error} - Si les devises ne sont pas supportées ou si le montant est invalide
 */
function convertCurrency(from, to, amount) {
  // Vérification des entrées
  if (!from || !to || amount === undefined) {
    throw new Error('Paramètres manquants');
  }

  from = from.toUpperCase();
  to = to.toUpperCase();

  // Vérification des devises supportées
  if (!EXCHANGE_RATES[from] || !EXCHANGE_RATES[from][to]) {
    throw new Error(`Conversion de ${from} vers ${to} non supportée`);
  }

  // Vérification du montant
  if (typeof amount !== 'number' || isNaN(amount) || amount < 0) {
    throw new Error('Le montant doit être un nombre positif');
  }

  // Conversion
  return parseFloat((amount * EXCHANGE_RATES[from][to]).toFixed(2));
}

module.exports = {
  convertCurrency,
  EXCHANGE_RATES
};
