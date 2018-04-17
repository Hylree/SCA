/** On importe les librairies */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const permisSchema = new Schema({
    date_obtention:{
        type: Date
    },
    nouvelle_date_obtention:{
        type: Date
    },
    lieu_obtention:{
        type: String
    },
    conduite_accompagne:{
        type: Boolean
    },
},{collection : 'permis'});

/** On exporte le modèle */
var Permis = mongoose.model('Permis', permisSchema);

module.exports = {
    Permis : Permis
};