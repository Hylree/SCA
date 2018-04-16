/** On importe les librairies */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const remorqueSchema = new Schema({
    type:{
        type: String,
        required: [true, 'Le type de remorque est requis.']
    },
    marque:{
        type: String,
        required: [true, 'La marque de la remorque est requis.']
    },
    immatriculation:{
        type: String,
        required: [true, 'L\'immatriculation est requise.']
    }
},{remorque : "remorque"});

var Remorque = mongoose.model('Remorque', remorqueSchema);

module.exports = {
    Remorque : Remorque
};