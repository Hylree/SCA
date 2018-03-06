/** Fichier pour les fonctions commune */

const checkTypeHab = function (type){
    const arrayTypeHabitation = ['Appartement', 'Maison', 'Autres'];
    let res = false;

    arrayTypeHabitation.forEach(function(element) {
        if(element === type){
            res = true;
        }
    }, this);

    return res;
}

const checkQualityForHab = function (quality){
    const arrayQuality = ['Location', 'Propriétaire', 'Autres'];
    let res = false;

    arrayQuality.forEach(function(element) {
        if(element === quality){
            res = true;
        }
    }, this);
    return res;
}

const checkSituationFamily = function (sit){
    const arraySitation = ['Célibataire', 'Marié', 'Concubinage', 'Séparer', 'Divorcé', 'Veuf', 'Pacs'];
    let res = false;

    arraySitation.forEach(function(element) {
        if(element === sit){
            res = true;
        }
    }, this);
    return res;
}

const checkSituationPro = function (sit){
    const arraySituation = ['Artisan', 'Exploitant agricole', 'Profession libérale', "Chef d'entreprise", 'Salarié', 'Fonctionnaire', 'VRP', 'Etudiant', 'Sans profession', "Recherche d'emploi", 'Ecclasiastique'];
    let res = false;

    arraySituation.forEach(function(element) {
        if(element === sit){
            res = true;
        }
    }, this);

    return res;
}

module.exports = {
    checkSituationPro: checkSituationPro,
    checkSituationFamily: checkSituationFamily,
    checkQualityForHab : checkQualityForHab ,
    checkTypeHab : checkTypeHab
  };