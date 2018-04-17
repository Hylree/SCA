/** On importe les librairies */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carteGriseImageSchema = new Schema({
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
    carte_grise_id:{
        type: Schema.Types.ObjectId,
        ref: 'CarteGrise'
    }
},{collection : "image_carte_grise"});

var CarteGriseImage = mongoose.model('CarteGriseImage', carteGriseImageSchema);

module.exports = {
    CarteGriseImage : CarteGriseImage
};