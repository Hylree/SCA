/** On importe les librairies */
const   mongoose = require('mongoose'),
        extend = require('mongoose-schema-extend');
const   Schema = mongoose.Schema;

/** On importe les Schemas */
const Sinistre = require('../../sinistre');


const sinistreAutoSchema = Sinistre.sinistreSchema.extend({
    conducteur_id:{
        type: Schema.Types.ObjectId,
        ref : 'Conducteur'
    },
    vehicule_id:{
        type: Schema.Types.ObjectId,
        ref: 'Vehicule'
    }
});

var SinistreAuto = mongoose.model('SinistreAuto', sinistreAutoSchema);

module.exports = {
    SinistreAuto : SinistreAuto
};