/** On importe les librairies */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const permisSchema = new Schema({
    conducteur:{
        type: Schema.Types.ObjectId,
        ref: 'Conducteur',
        required: [true, 'Vous devez renseigné le conducteur.']
    },
    date_obtention:{
        type: Date,
        required: [true, 'Vous devez renseigné la date d\'obtention du permis.']
    },
    conduite_accompagne:{
        type: Boolean,
        required: [true, 'Vous devez indiqué si oui ou non le conducteur à passer la conduite accompagné.']
    }
});

/** On exporte le modèle */
var Permis = mongoose.model('Permis', permisSchema);

module.exports = {
    Permis : Permis
};