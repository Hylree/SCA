/** On importe les librairies */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const relationSinistreSchema = new Schema({
    conducteur_id:{
        type: Schema.Types.ObjectId,
        ref : 'Conducteur'
    },
    vehicule_id:{
        type: Schema.Types.ObjectId,
        ref: 'Vehicule'
    },
    sinitre_id:{
        type: Schema.Types.ObjectId,
        ref: 'RelationTypeSinistre'
    }
});

var RelationSinistre = mongoose.model('RelationSinistre', relationSinistreSchema);

module.exports = {
    RelationSinistre : RelationSinistre
};