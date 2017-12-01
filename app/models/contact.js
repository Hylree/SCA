/** On importe les librairies */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/** On déclare le schéma */

const contactSchema = new Schema({
        message:{
            type: String,
            required: [true, 'Pas de contenue de message'],
        }
    }
)

/** On exporte le modèle */
module.exports = mongoose.model('Contact', contactSchema);