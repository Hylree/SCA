/** On importe les librairies */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**On construit les schémas */
const conducteurSchema = new Schema({
    permis_id:{
        type: Schema.Types.ObjectId,
        ref: 'Permis',
        required: [true, 'Renseigné le permis de conduire.']
    },
    antecedent_assurance_id:{
        type: Schema.Types.ObjectId,
        ref: 'AntecedentAssurance'
    }
},{ colletion : 'conducteur'});

/** On exporte le modèle */
var Conducteur = mongoose.model('Conducteur', conducteurSchema);

module.exports = {
    Conducteur : Conducteur
};