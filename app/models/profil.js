
/** On importe les librairies */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profilSchema = new Schema({
    
        id: {
            type: String
        },
        name:{
            type: String,
        },
        description:{
            type : String
        }
    },{collection : "profils"});

/** On exporte le modèle Profil */
var Profil = module.exports = mongoose.model('Profil', profilSchema)