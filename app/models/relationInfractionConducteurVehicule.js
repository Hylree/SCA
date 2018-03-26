/** On importe les librairies */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const relationInfractionConducteurVehiculeSchema = new Schema({
    conducteur_id:{
        type: Schema.Types.ObjectId,
        ref : 'Conducteur'
    },
    vehicule_id:{
        type: Schema.Types.ObjectId,
        ref: 'Vehicule'
    },
    infraction_id:{
        type: Schema.Types.ObjectId,
        ref: 'Infraction'
    }
});

var RelationInfractionConducteurVehicule = mongoose.model('RelationInfractionConducteurVehicule', relationInfractionConducteurVehiculeSchema);

module.exports = {
    RelationInfractionConducteurVehicule : RelationInfractionConducteurVehicule
};
