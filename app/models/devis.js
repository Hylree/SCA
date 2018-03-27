/**On importe les librairies */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/** On déclare les schémas */
const devisSchema = new Schema({
    demandeur: {
        type: Schema.Type.ObjectId,
        ref: 'User',
        required: [true, 'La liason avec le demandeur est requis.']
    },
    date_creation:{
        type: Date,
        default: Date.now,
        required: [true, 'Date de création requise']
    },
    date_prise_en_compte:{
        type: Date
    },
    statut:{
        type: String,
        required: [true, 'Un statut est requis.']
    }
},{ 
    colletion: 'devis',
    discriminatorKey : '_type'
});


/** On exporte le modèle */
var Devis = mongoose.model('Devis', devisSchema);

module.exports = {
    Devis : Devis,
    devisSchema : devisSchema
};