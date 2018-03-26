/** On importe les librairies */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const humanSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    conducteur:{
        type: Schema.Types.ObjectId,
        ref: 'Conducteur'
    }
});

var Human = mongoose.model('Human', humanSchema);

module.exports = {
    Human : Human
};