/** On importe les librairies */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**On construit les schémas */
const resiliationSchema = new Schema({
    
    precedant_assureur_id:{
        type: Schema.Types.ObjectId,
        ref: 'Assureur'
    },
    alcool_stup:{
        type: String,
        required: [true, 'Indiquez l\'usage de stupéfiant ou non']
    },
    sinistre:{
        type: String,
        required: [true, 'Indiquez pour sinistre ou non']
    },
    non_paiement:{
        type: String,
        required: [true, 'si pour non paiement de stupéfiant ou non est requis']
    },
    precedent_assureur_solde:{
        type: String,
        required: [true, 'Indiquez si le précédent assureur est soldé ou non']
    },
    fausse_declaration:{
        type: String,
        required: [true, 'Indiquez si c\'est pour une fausse déclaration ou non']
    },
    defaut_pieces:{
        type: String,
        required: [true, 'Indiquez si il y a eu un defaut de pièce ou non']
    },
    nullite_contrat:{
        type: String,
        required: [true, 'Indiquez l\'usage de stupéfiant ou non']
    },
    autres:{
        type: String
    }
},{collection: 'resiliation'});

/** On exporte le modèle */
var Resiliation = mongoose.model('Resiliation', resiliationSchema);

module.exports = {
    Resiliation : Resiliation
};