/** On importe les librairies */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/** On déclare le schéma User*/
const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'L\'email doit être renseigné'],
        unique: [true, 'Le nom d\'utilisateur ou le mot de passe n\'est pas valide'],
        minlength: [3, 'L\'email doit être supérieur à 3 caractères'],
        maxlength: [255, 'L\'email doit être inférieur à 255 caractères']
    },
    password: {
        type: String,
        required: [true, 'Le mot de passe doit être renseigné.'],
        unique: false,
        minlength: [8, 'Le mot de passe doit être supérieur à 8 caractères.']
    },
    profil : {
        type : Schema.Types.String,
        ref: 'Profil',
        default: 'prospect'
    },
    civilite:{
        type: String,
        required: [true, 'La civilité doit être renseigné.']
    },

    last_name : {
        type : String,
        required : [true, 'Le nom de famille doit être renseigné.']
    },
    first_name : {
        type : String,
        required : [true, 'Le prénom doit être renseigné.']
    },
    tel : {
        type: String,
        required : [true, "Le numéro de téléphone doit être renseigné"]
    },
    date_naissance :{
        type: Date,
        required: [true, "La date de naissance doit être renseigné"]
    },
    num_street :{
        type: Number
    },
    name_street :{
        type: String,
        required: [true, "L'adresse doit être rensaigné."]
    },
    more_street : {
        type: String
    },
    code: {
        type: String,
        required: [true, "Le code postal doit être renseigné"]
    },
    city : {
        type: String,
        required : [true, "La ville doit être renseigné."]
    },
    home_type : {
        type: String,
        required : [true, "Le type de logement principal doit être renseigné"]
    },
    situation_fam :{
        type: String,
        required : [true, "La situation familliale doit être renseigné"]
    },
    situation_pro: {
        type: String,
        required: [true, "La situation doit être renseigné."]
    },
    authToken: {
        type: String,
        required: false,
        unique: true,
        sparse: true,
        index: true
    },
    validUntil: {
        type: Date,
        required: false,
        unique: false
    }
});



var User = module.exports = mongoose.model('User', userSchema);