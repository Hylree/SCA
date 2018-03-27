/** On importe les librairies */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const infractionSchema = new Schema({
    conducteur_id:{
        type: Schema.Types.ObjectId,
        ref : 'Conducteur'
    },
    vehicule_id:{
        type: Schema.Types.ObjectId,
        ref: 'Vehicule'
    },
    alcool: {
        type: Boolean,
        required: [true, 'Renseigné infraction par alcool.']
    },
    alcool_sinistre: {
        type: Boolean,
        required: [true, 'Renseigné infraction par alcool sinistre.']
    },
    stupefiant: {
        type: Boolean,
        required: [true, 'Renseigné infraction par stupefiant.']
    },
    stupefiant_sinistre: {
        type: Boolean,
        required: [true, 'Renseigné infraction par stupefiant.']
    },
    point: {
        type: Boolean,
        required: [true, 'Renseigné infraction par defaut de point.']
    },
    delit_fuite: {
        type: Boolean,
        required: [true, 'Renseigné infraction par delit de fuite.']
    },
    defaut_assurance: {
        type: Boolean,
        required: [true, 'Renseigné infraction par alcool.']
    },
    refus_dobtemperer:{
        type: Boolean,
        required: [true, 'Renseigné infraction par refus d\'obtempérer.']
    },
    sanction:{
        type: Schema.Types.ObjectId,
        ref: 'Sanction'
    },
    autre:{
        type: String
    }
});

/** On exporte le modèle */
var Infraction = mongoose.model('Infraction', infractionSchema);

module.exports = {
    Infraction : Infraction
};