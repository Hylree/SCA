/** On importe les librairies */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const garantieMiniSchema = new Schema({
    garanties:[{
        name:{
            type: String
        }
    }]
});
const garantieMaxiSchema = new Schema({
    garantie:[{
        name:{
            type: String
        }
    }]
});
const garantieMediumSchema = new Schema({
    garanties:[{
        name:{
            type: String
        }
    }]
});
const garantieMiniPlusSchema = new Schema({
    garanties:[{
        name:{
            type: String
        }
    }]
});

var GarantieMini = mongoose.model('GarantieMini', garantieMiniSchema),
    GarantiMaxi = mongoose.model('GarantiMaxi', garantieMaxiSchema),
    GarantiMedium = mongoose.model('GarantiMedium', garantieMediumSchema),
    GarantiMiniPlus = mongoose.model('GarantiMiniPlus', garantieMiniPlusSchema);

module.exports = {
    GarantieMini : GarantieMini,
    GarantiMaxi : GarantiMaxi, 
    GarantiMedium : GarantiMedium,
    GarantiMiniPlus : GarantiMiniPlus
};