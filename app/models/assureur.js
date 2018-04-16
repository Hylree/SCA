/** On importe les librairies */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**On construit les schémas */
const assureurSchema = new Schema({
    name:{
        type: String
    }
});

/** On exporte le modèle */
var Assureur = mongoose.model('Assureur', assureurSchema);

module.exports = {
    Assureur : Assureur
};