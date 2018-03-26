/** On importe les librairies */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vehiculeSchema = new Schema({
    marque:{
        type: String,
        required: [true, 'La marque du véhicule est requis.']
    },
    modele:{
        type: String,
        required: [true, 'Le modele du véhicule est requis.']
    },
    nbr_cheveaux:{
        type: Number,
        require: [true, 'Veuillez renseigner le nombre de cheveaux du véucule.']
    },
    code_sra:{
        type: String,
    },
    type:{
        type: String,
        required: [true, 'Les type du véhicule est requis.']
    },
    carte_grise: {
        type: Schema.Types.ObjectId,
        ref:'CarteGrise'
    },
    date_permiere_circulation:{
        type: Date,
        required: [true, 'La date de première mise en circulation doit être renseigné.']
    },
    immatriculation:{
        type : String,
        required: [true, 'l\'immatriculation du véhicule doit être renseigné.']
    },
    immatriculation_speciale:{
        type: Boolean,
        required: [true, 'La spécialisation de l\'immatriculation est requis.']
    },
    date_achat:{
        type: Date,
        required : [true, 'La date d\'achat est requis.']
    },
    mode_acquisition:{
        type: String,
        required: [true, 'le mode d\'acquisition du véhicule est requis.']
    },
    parcking: {
        type: Schema.Types.ObjectId,
        ref: 'Parcking',
        required: [true, 'Le parcking doit être renseigné.']
    },
    protection_vol:{
        type: Schema.Types.ObjectId,
        ref: 'ProctectionVol'
    },
    usage:[{
        usage : {
            type : String
        }
    }]

});

var Vehicule = mongoose.model('Vehicule', vehiculeSchema);

module.exports = {
    Vehicule : Vehicule
};