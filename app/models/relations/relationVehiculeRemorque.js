/** On importe les librairies */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const relationVehiculeRemorqueSchema = new Schema({
    remorque_id:{
        type: Schema.Types.ObjectId,
        ref: 'Remorque'
    },
    vehicule_id:{
        type: Schema.Types.ObjectId,
        ref:'Vehicule'
    }
});

var RelationVehiculeRemorque = mongoose.model('RelationVehiculeRemorque', relationVehiculeRemorqueSchema);

module.exports = {
    RelationVehiculeRemorque : RelationVehiculeRemorque
};