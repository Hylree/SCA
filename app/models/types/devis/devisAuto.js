/** On importe les librairies */
const   mongoose = require('mongoose'),
        extend = require('mongoose-schema-extend');
const   Schema = mongoose.Schema;

/** On importe les Schemas */
const Devis = require('../../devis');

/** Type de devis */
const devisAutoSchema = Devis.devisSchema.extend({
    
    vehicule_id:{
        type: Schema.Types.ObjectId,
        ref:'Vehicule'
    },
    garantie_id:{
        type: Schema.Types.ObjectId,
        ref :'Garantie'
    },
    fractionnement:{
        type: String,
        required: [true, 'Le choix d\'un fractionnement est requis.']
    },
    date_effet_souhait:{
        type: Date
    },
    validation:{
        type: Boolean,
        required: [true, 'Vous devez valider.']
    }
},{ collection : "devis_auto"});



/** On exporte le modèle */
var DevisAuto = mongoose.model('DevisAuto', devisAutoSchema);

module.exports = {
    DevisAuto : DevisAuto
};