/** On importe les librairies */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/** On déclare le schéma */

const postSchema = new Schema({
        message:{
            type: String,
            required: [true, 'Pas de contenue de message'],
        }
    ,
    path:{
        type: String
    }
});

/** On exporte le modèle */
module.exports = mongoose.model('Post', postSchema);