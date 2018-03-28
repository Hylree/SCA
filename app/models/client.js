/** On importe les librairies */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientSchema = new Schema({
    numero_client:{
        type: String
    }
}, {collection : 'client'});

var Client = mongoose.model('Client', clientSchema);

module.exports = {
    Client : Client
};