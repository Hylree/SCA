/**On importe les librairies */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/** On declare les Schema */
const sinistreSchema = new Schema({
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
    }
},{
    collection : 'sinistres',
    discriminatorKey : '_type'
});


var Sinistre = mongoose.model('Sinistre', sinistreSchema);

module.exports = {
    sinistreSchema : sinistreSchema,
    Sinistre : Sinistre
};
