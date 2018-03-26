/** On importe les librairies */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const relationConducteurDevisAuto = new Schema({
    conducteur_principal_id:{
        type: Schema.Types.ObjectId,
        ref: 'Conducteur',
        required: [true, 'Il faut renseigner un conducteur principale.']
    },
    conducteur_secondaire_id:{
        type: Schema.Types.ObjectId,
        ref: 'Conducteur'
    },
    devis_auto_id:{
        type: Schema.Types.ObjectId,
        ref: 'DevisAuto',
        required: [true,'il faut lié un devis']
    }
});

var RelationConducteurDevisAuto = mongoose.model('RelationConducteurDevisAuto', relationConducteurDevisAuto);

module.exports = {
    RelationConducteurDevisAuto : RelationConducteurDevisAuto
};