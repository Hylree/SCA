/** On importe les librairies */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/** On déclare le schéma User*/
const profilSchema = new Schema({

    name: {
        type: String,
        default: 'Prospect'
    },
    droit: {
        type: String,
        default: 'default'
    }
});

profilSchema.virtual('user', {
    ref: 'User',
    localField: '_id',
    foreignField: 'type'
});

/** On exporte le modèle User */
module.exports = mongoose.model('Type', profilSchema);