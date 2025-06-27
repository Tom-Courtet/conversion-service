/**
 * Service de calculs financiers
 */

/**
 * Calcule le montant TTC à partir d'un montant HT et d'un taux de TVA
 * @param {number} ht - Montant hors taxe
 * @param {number} taux - Taux de TVA (en pourcentage)
 * @returns {number} - Montant TTC
 * @throws {Error} - Si les paramètres sont invalides
 */
function calculateTTC(ht, taux) {
  // Vérification des entrées
  if (ht === undefined || taux === undefined) {
    throw new Error('Paramètres manquants');
  }

  // Conversion en nombre
  ht = Number(ht);
  taux = Number(taux);

  // Vérification des valeurs
  if (isNaN(ht) || isNaN(taux)) {
    throw new Error('Les paramètres doivent être des nombres');
  }

  if (ht < 0) {
    throw new Error('Le montant HT doit être positif');
  }

  if (taux < 0) {
    throw new Error('Le taux de TVA doit être positif');
  }

  // Calcul du montant TTC
  return parseFloat((ht * (1 + taux / 100)).toFixed(2));
}

/**
 * Applique une remise sur un prix
 * @param {number} prix - Prix initial
 * @param {number} pourcentage - Pourcentage de remise
 * @returns {number} - Prix après remise
 * @throws {Error} - Si les paramètres sont invalides
 */
function applyDiscount(prix, pourcentage) {
  // Vérification des entrées
  if (prix === undefined || pourcentage === undefined) {
    throw new Error('Paramètres manquants');
  }

  // Conversion en nombre
  prix = Number(prix);
  pourcentage = Number(pourcentage);

  // Vérification des valeurs
  if (isNaN(prix) || isNaN(pourcentage)) {
    throw new Error('Les paramètres doivent être des nombres');
  }

  if (prix < 0) {
    throw new Error('Le prix doit être positif');
  }

  if (pourcentage < 0 || pourcentage > 100) {
    throw new Error('Le pourcentage de remise doit être compris entre 0 et 100');
  }

  // Calcul du prix après remise
  return parseFloat((prix * (1 - pourcentage / 100)).toFixed(2));
}

module.exports = {
  calculateTTC,
  applyDiscount
};
