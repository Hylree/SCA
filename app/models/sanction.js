/** On importe les librairies */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sanctionSchema = new Schema({
    type:{
        type: String,
        required: [true, 'Le type de sanction est requis.']
    },
    date:{
        type: Date,
        required: [true, 'La date de la sanction est requis']
    },
    durée:{
        type: Number
    }
});


var Sanction = mongoose.model('Sanction', sanctionSchema);

module.exports = {
    Sanction : Sanction
};