/** On importe les librairies */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/** on déclare les schémas */

const relationsGaranties = new Schema({
    mini:{
        garantie : {
            type : String,
        }
    }
});

var DevisAuto = mongoose.model('DevisAuto', devisAutoSchema);

module.exports = {
    DevisAuto : DevisAuto
};