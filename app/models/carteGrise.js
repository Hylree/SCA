/** On importe les librairies */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carteGriseSchema = new Schema({
    name:{
        type: String
    },
    path:{
        type: String
    },
    size:{
        type: Number
    },
    type:{
        type: String
    },
    date:{
        type: Date,
        default: Date.now
    }
});

var CarteGrise = mongoose.model('CarteGrise', carteGriseSchema);

module.exports = {
    CarteGrise : CarteGrise
};