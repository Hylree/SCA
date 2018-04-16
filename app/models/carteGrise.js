/** On importe les librairies */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carteGriseSchema = new Schema({
    
}, {collection : "carte_grise"});

var CarteGrise = mongoose.model('CarteGrise', carteGriseSchema);

module.exports = {
    CarteGrise : CarteGrise
};