/** On importe les librairies */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**On construit les schémas */
const conducteurSchema = new Schema({
    nom:{
        type: String,
        required: [true, 'Vous devez renseigné le nom.']
    },
    prenom:{
        type: String,
        required: [true, 'Vous devez renseigné le prénom.']
    },
    date_naissance:{
        type: Date,
        default: Date.now
    },
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
    },
    sinistre_id: {
        type: Schema.Types.ObjectId,
        ref: 'RelationSinistreConducteur'
    },
    infractions:{
        types: Schema.Types.ObjectId,
        ref: 'relationInfractionConducteurVehicule'
    }
});

/** On exporte le modèle */
var Conducteur = mongoose.model('Conducteur', conducteurSchema);

module.exports = {
    Conducteur : Conducteur
};