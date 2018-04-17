/** On importe les librairies */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const relationConducteurVehiculeSchema = new Schema({
    conducteur_id:{
        type: Schema.Types.ObjectId,
        ref: 'Conducteur'
    },
    conducteur_principal: {
        type: Boolean
    },
    vehicule_id:{
        type: Schema.Types.ObjectId,
        ref:'Vehicule'
    }
},{collection : "relation_conducteur_vehicule"});

var RelationConducteurVehicule = mongoose.model('RelationConducteurVehicule', relationConducteurVehiculeSchema);

module.exports = {
    RelationConducteurVehicule : RelationConducteurVehicule
};