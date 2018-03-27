/** On importe les librairies */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**On construit les schémas */
const conducteurSchema = new Schema({
    permis:{
        type: Schema.Types.ObjectId,
        ref: 'Permis',
        required: [true, 'Renseigné le permis de conduire.']
    },
    situation_familliale:{
        type: String,
        required: [true, 'Vous devez renseigné votre situation familliale.']
    },
    antecedant_assurance_id:{
        type: Schema.Types.ObjectId,
        ref: 'AntecedantAssurance'
    }
});

/** On exporte le modèle */
var Conducteur = mongoose.model('Conducteur', conducteurSchema);

module.exports = {
    Conducteur : Conducteur
};