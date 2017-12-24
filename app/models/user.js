/** On importe les librairies */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const relationship = require('mongoose-relationship');

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
    //modif
    /**genre:{
        type: String,
        required: [true, 'Vous êtes un homme ou une femme?'],
        validate: {
            validator : function(v){
                if(v != "Homme" || v != "Femme"){
                    return true;
                }else{ 
                    re
                }
        },
        message : [true, 'Vous avez rentré une mauvaise donnée.']
    }
    }

    },*/
    profil: {
        type: Schema.ObjectId,
        ref: 'Profil',
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

/** On exporte le modèle User */
var User = mongoose.model('User', userSchema)
module.exports = User;

const profilSchema = new Schema({
    profil_name: {
        type: Schema.ObjectId,
        ref:'User',
        childPath:'profil'
    },
    test:{
        type: String,
        default: 'default'
    }
});

var Profil = mongoose.model('Profil', profilSchema)
module.exports = Profil;

profilSchema.plugin(relationship, {relationshipPathName: 'profil_name'});

var user = new User({});
user.save();

var profil = new Profil({user: user._id});

profil.save();
profil.remove();

