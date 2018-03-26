/**On importe les librairies */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/** On déclare les schémas */
const demandeDevisSchema = new Schema({
    devis_id : {
        type: Schema.Type,ObjectId,
        ref :'Devis',
        required: [true, 'Une type de devis est requis.']
    },
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
});


/** On exporte le modèle */
var DemandeDevis = mongoose.model('DemandeDevis', demandeDevisSchema);

module.exports = {
    DemandeDevis: DemandeDevis
};