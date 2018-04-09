/** On importe les librairies */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const permisImageSchema = new Schema({
    name:{
        type: String
    },
    path:{
        type: String
    },
    size:{
        type: Number
    },
    type:{
        type: String
    },
    date:{
        type: Date,
        default: Date.now
    },
    permis_id:{
        type: Schema.Types.ObjectId,
        ref: 'Permis'
    }
});

var PermisImage = mongoose.model('PermisImage', permisImageSchema);

module.exports = {
    PermisImage : PermisImage
};