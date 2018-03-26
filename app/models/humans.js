/** On importe les librairies */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const humanSchema = new Schema({
    user_id:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    conducteur_id:{
        type: Schema.Types.ObjectId,
        ref: 'Conducteur'
    },
    client_id:{
        type: Schema.Types.ObjectId,
        ref: 'Client'
    }
});

var Human = mongoose.model('Human', humanSchema);

module.exports = {
    Human : Human
};