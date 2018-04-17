/** On importe les librairies */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/** on déclare les schémas */

const GarantieSchema = new Schema({
    name:{
        type: String,
        required:[true, 'Vous devez indiquer un nom pour la garantie.']
    },
    resp_civile:{
        type: String,
        required: [true, 'Responsabilité civile est à remplir.']
    },
    inc:{
        type: String,
        required: [true, 'Ce champs doit être renseigné.']
    },
    defence_penal_recours:{
        type: String,
        required: [true, 'Ce champs doit être renseigné.']
    },
    vol:{
        type: String,
        required: [true, 'Ce champs doit être renseigné.']
    },
    dommage_tout_risque:{
        type: String,
        required: [true, 'Ce champs doit être renseigné.']
    }
}, {collection : "garanties"});

var Garantie = mongoose.model('Garantie', GarantieSchema);

module.exports = {
    Garantie : Garantie
};