/** On importe les librairies */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/** on déclare les schémas */

const devisAutoSchema = new Schema({
    conducteurs:{
        type: Schema.Types.ObjectId,
        ref:'RelactionConducteurDevisAuto'
    },
    vehicule:{
        type: Schema,Types,ObjectId,
        ref:'Vehicule'
    },
    garantie:{
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

});

var DevisAuto = mongoose.model('DevisAuto', devisAutoSchema);

module.exports = {
    DevisAuto : DevisAuto
};