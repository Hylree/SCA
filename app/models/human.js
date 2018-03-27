/** On importe les librairies */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const humanSchema = new Schema({
    civilite: {
        type: String,
        required: [true, 'La civilité doit être renseigné.']
    },
    last_name: {
        type : String,
        required : [true, 'Le nom de famille doit être renseigné.']
    },
    first_name: {
        type : String,
        required: [true, 'Le prénom doit être renseigné.']
    },
    tel: {
        type: String,
        required : [true, "Le numéro de téléphone doit être renseigné"]
    },
    date_naissance : {
        type: Date,
        required: [true, "La date de naissance doit être renseigné"]
    },
    num_street : {
        type: Number
    },
    name_street: {
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
    city: {
        type: String,
        required : [true, "La ville doit être renseigné."]
    },
    home_type: {
        type: String,
        required : [true, "Le type de logement principal doit être renseigné"]
    },
    situation_fam: {
        type: String,
        required : [true, "La situation familliale doit être renseigné"]
    },
    situation_pro: {
        type: String,
        required: [true, "La situation doit être renseigné."]
    },
    user_id:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    conducteur_id:{
        type: Schema.Types.ObjectId,
        ref: 'Conducteur'
    },
    client_id:{
        type: Schema.Types.ObjectId,
        ref: 'Client'
    }
});

var Human = mongoose.model('Human', humanSchema);

module.exports = {
    Human : Human
};