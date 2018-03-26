/** On importe les librairies */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const relationConducteurVehiculeSchema = new Schema({
    conducteur_id:{
        type: Schema.Types.ObjectId,
        ref: 'Conducteur'
    },
    vehicule_id:{
        type: Schema.Types.ObjectId,
        ref:'Vehicule'
    }
});

var RelationConducteurVehicule = mongoose.model('RelationConducteurVehicule', relationConducteurVehiculeSchema);

module.exports = {
    RelationConducteurVehicule : RelationConducteurVehicule
};