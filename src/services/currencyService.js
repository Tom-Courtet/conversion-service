/**
 * Service de conversion de devises utilisant l'API de taux de change
 */
const exchangeRateApi = require('./exchangeRateApi');

/**
 * Convertit un montant d'une devise à une autre en utilisant l'API de taux de change
 * @param {string} from - Devise source
 * @param {string} to - Devise cible
 * @param {number} amount - Montant à convertir
 * @returns {Promise<number>} - Montant converti
 */
async function convertCurrencyWithApi(from, to, amount) {
  // Vérification des entrées
  if (!from || !to || amount === undefined) {
    throw new Error('Paramètres manquants');
  }

  from = from.toUpperCase();
  to = to.toUpperCase();

  // Vérification du montant
  if (typeof amount !== 'number' || isNaN(amount) || amount < 0) {
    throw new Error('Le montant doit être un nombre positif');
  }

  try {
    // Récupération du taux de change via l'API
    const rate = await exchangeRateApi.getExchangeRate(from, to);
    
    // Conversion
    return parseFloat((amount * rate).toFixed(2));
  } catch (error) {
    throw error;
  }
}

module.exports = {
  convertCurrencyWithApi
};
