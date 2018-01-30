/** On importe les librairies */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/** On déclare le schéma */

const imageSchema = new Schema({
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

/** On exporte le modèle */
module.exports = mongoose.model('Image', imageSchema);