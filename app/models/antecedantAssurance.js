/** On importe les librairies */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const antecedantAssuranceSchema = new Schema({
    periode : [{
        zero_douze : {
            type : Number
        },
        treize_vingtquatre : {
            type : Number
        },
        vingtcinq_trentesix: {
            type: Number
        }
    }],
    resiliation_id:{
        type: Schema.Types.ObjectId,
        ref: 'Resiliation'
    }
});

var AntecedantAssurance = mongoose.model('AntecedantAssurance' , antecedantAssuranceSchema);

module.exports = {
    AntecedantAssurance : AntecedantAssurance
};