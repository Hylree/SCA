/** On importe les librairies */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sanctionSchema = new Schema({
    type:{
        type: String,
        required: [true, 'Le type de sanction est requis.']
    },
    infration_id:{
        type: Schema.Types.ObjectId,
        ref: 'Infraction'
    },
    date:{
        type: Date,
        required: [true, 'La date de la sanction est requis']
    },
    durée:{
        type: Number
    }
}, {collection : "sanctions"});


var Sanction = mongoose.model('Sanction', sanctionSchema);

module.exports = {
    Sanction : Sanction
};