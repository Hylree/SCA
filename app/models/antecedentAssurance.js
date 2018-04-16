/** On importe les librairies */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const antecedentAssuranceSchema = new Schema({
    0_12 : {
        type : Number
    },
    13_24: {
        type : Number
    },
    25_36: {
        type: Number
    },
    resiliation_id:{
        type: Schema.Types.ObjectId,
        ref: 'Resiliation'
    }
},{collection : "antecedent_assurance"});

var AntecedantAssurance = mongoose.model('AntecedantAssurance' , antecedantAssuranceSchema);

module.exports = {
    AntecedantAssurance : AntecedantAssurance
};