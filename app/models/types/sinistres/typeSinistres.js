/** On importe les librairies */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sinistreAutoSchema = new Schema({
    date:{
        type: Date,
        required:[true, 'La date du sinistre est requise.']
    },
    nature:{
        type: String,
        required: [true, 'Vous devez spécifier la nature.']
    },
    resp:{
        type: String
    },
    conducteur_id:{
        type: Schema.Types.ObjectId,
        ref : 'Conducteur'
    },
    vehicule_id:{
        type: Schema.Types.ObjectId,
        ref: 'Vehicule'
    }
});

var SinistreAuto = mongoose.model('SinistreAuto', sinistreAutoSchema);

module.exports = {
    SinistreAuto : SinistreAuto
};