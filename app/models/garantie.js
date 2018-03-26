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
        type: Boolean,
        required: [true, 'Responsabilité civile est à remplir.']
    },
    inc:{
        type: Boolean,
        required: [true, 'Ce champs doit être renseigné.']
    },
    defence_penal_recours:{
        type: Boolean,
        required: [true, 'Ce champs doit être renseigné.']
    },
    vol:{
        type: Boolean,
        required: [true, 'Ce champs doit être renseigné.']
    },
    dommage_tout_risque:{
        type: Boolean,
        required: [true, 'Ce champs doit être renseigné.']
    }
});

var Garantie = mongoose.model('Garantie', GarantieSchema);

module.exports = {
    Garantie : Garantie
};