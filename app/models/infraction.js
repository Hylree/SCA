/** On importe les librairies */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const infractionSchema = new Schema({
    conducteur_id:{
        type: Schema.Types.ObjectId,
        ref : 'Conducteur'
    },
    sanction_id:{
        type: Schema.Types.ObjectId,
        ref: 'Sanction'
    },
    alcool: {
        type: String
    },
    alcool_sinistre: {
        type: String
    },
    stupefiant: {
        type: String
    },
    stupefiant_sinistre: {
        type: String
    },
    point: {
        type: String
    },
    delit_fuite: {
        type: String
    },
    defaut_assurance: {
        type: String
    },
    refus_dobtemperer:{
        type: String
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