/** On importe les librairies */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**On construit les schémas */
const resiliationSchema = new Schema({
    alcool_stup:{
        type: Boolean,
        required: [true, 'Indiquez l\'usage de stupéfiant ou non']
    },
    sinistre:{
        type: Boolean,
        required: [true, 'Indiquez pour sinistre ou non']
    },
    non_paiement:{
        type: Boolean,
        required: [true, 'si pour non paiement de stupéfiant ou non est requis']
    },
    precedant_assureur_solde:{
        type: Boolean,
        required: [true, 'Indiquez si le précédent assureur est soldé ou non']
    },
    fausse_declaration:{
        type: Boolean,
        required: [true, 'Indiquez si c\'est pour une fausse déclaration ou non']
    },
    defaut_piece:{
        type: Boolean,
        required: [true, 'Indiquez si il y a eu un defaut de pièce ou non']
    },
    nullite_contrat:{
        type: Boolean,
        required: [true, 'Indiquez l\'usage de stupéfiant ou non']
    },
    autres:{
        type: String
    }
});

/** On exporte le modèle */
var Resiliation = mongoose.model('Resiliation', resiliationSchema);

module.exports = {
    Resiliation : Resiliation
};