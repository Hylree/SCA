/** On importe les librairies */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/** On déclare le schéma */

const imageSchema = new Schema({
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
    }
});

/** On exporte le modèle */
var Image = mongoose.model('Image', imageSchema);

const relationImagePostSchema = new Schema({
    id_image:{
        type : Schema.Types.ObjectId,
        ref: 'Image'
    },
    id_post:{
        type : Schema.Types.ObjectId,
        ref: 'Post'
    },
    date:{
        type: Date,
        default: Date.now
    }
});

/** On exporte le modèle */
var RelationImage = mongoose.model('RelationImagePost', relationImagePostSchema);

module.exports = {
    Image: Image,
    RelationImage : RelationImage
};
