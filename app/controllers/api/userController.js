/** On importe les librairies */
const bcrypt = require('bcrypt-nodejs');

/** On importe les modèles */
const User = require('../../models/user');

/** On importe de ficher des fonctions de l'application */
const FunctionApp = require('../../functions/appFunctions');

/** On déclare les fonctions liées aux animaux */

const getUsers = (req, res) => {

    User.find({}, (err, users) => {
        if (err) throw err;

        res.status(200).send({ success: true, users: users });
    });

};

const postUsers = (req, res) => {

    req.body.password = bcrypt.hashSync(req.body.password, null);
        
    User.create(req.body, (err, user) => {
        if (err) {
            res.status(400).send({ success: false, error: err });
        } else {
            res.status(201).send({ success: true, user: user });
        }
    });
        


};

const getUniqueUser = (req, res) => {
    let id = req.params.id;
    User.findOne({ _id : id}, (err, user) => {
        res.status(200).send({ success: true, user: user});
    });
};

const updateOneUser = (req, res) => {
    
    const id = req.params.id; //Récuperation de l'id de du client
    const errors = [];
    const success = [];
    const dateNow = new Date();
    const cp = req.body.code;
    const typeHab = req.body.home_type;
    const regex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/gmi;

    console.log(req.body);
        if(req.body.password !== req.body.password_confirm){
            errors.push("Le mot de passe est invalide");
        }else{
            req.body.password = bcrypt.hashSync(req.body.password, null);
        }
    
    
        if(req.body.civilite !== 'Mme' && req.body.civilite !== 'M'){
            errors.push("La civilité est mal renseigné. Civilité : " + req.body.civilite + '.');
        }
    
        if(regex.test(req.body.tel) === false){
            errors.push("Le téléphone n'a pas la bonne forme: " + req.body.tel);
        }
    
        if(req.body.bday == ''){
            errors.push("La date de naissance doit être renseignée: " + req.body.bday);
    
        }else{
          let date = req.body.bday.toLocaleString('en-US');
          console.log(date);
            req.body.date_naissance = new Date(Date.UTC(req.body.bday).toLocaleString('en-US'));
        }
                
        if(req.body.code.length !== 5){
            errors.push("Le code postale doit contenir 5 caractères" + cp);
        }
    
        if(FunctionApp.checkTypeHab(req.body.home_type) === false ){
            errors.push("Le type de logement est invalide." + req.body.home_type);
        }
    
        if(FunctionApp.checkQualityForHab(req.body.tenant_type) === false){
            errors.push("La qualité de l'occupant est invalide. " + req.body.tenant_type);
        }
    
        if(FunctionApp.checkSituationFamily(req.body.situation_fam) === false){
            errors.push("La situation de famille est invalide." + req.body.situation_fam);
        }
    
        if(FunctionApp.checkSituationPro(req.body.situation_pro) === false){
            errors.push("La situation professionnel est invalide. " + req.body.situation_pro);
        }

            User.findByIdAndUpdate(id, {$set :req.body}, (err, resultat) => {
                if (err || errors.length > 0) {
                    console.log(err);
                    if(err){
                        if(err.code === 11000){
                            errors.push("L'utilisateur existe déjà.");
                        }
                        for(const error in err.errors){
                            if (err.errors[error].name === 'ValidatorError') {
                                errors.push(err.errors[error].properties.message);
                            }
                        } 
                    }
                    //res.cookie('flashErrors', errors);
                    
                    res.status(200).send({ resultat : errors });
                    
                }
                else {
                    success.push("Compte enregistré.");
                    //res.cookie('flashSuccess', ['Bravo']);
                    res.status(200).render({ resultat : success });                
                    //res.status(201).redirect( '/' );
                }
            });

    
};
function checkTypeHab(type){
    const arrayTypeHabitation = ['Appartement', 'Maison', 'Autres'];
    let res = false;

    arrayTypeHabitation.forEach(function(element) {
        if(element === type){
            res = true;
        }
    }, this);

    return res;
}

function checkQualityForHab(quality){
    const arrayQuality = ['Location', 'Propriétaire', 'Autres'];
    let res = false;

    arrayQuality.forEach(function(element) {
        if(element === quality){
            res = true;
        }
    }, this);
    return res;
}

function checkSituationFamily(sit){
    const arraySitation = ['Célibataire', 'Marié', 'Concubinage', 'Séparer', 'Divorcé', 'Veuf', 'Pacs'];
    let res = false;

    arraySitation.forEach(function(element) {
        if(element === sit){
            res = true;
        }
    }, this);
    return res;
}

function checkSituationPro(sit){
    const arraySituation = ['Artisan', 'Exploitant agricole', 'Profession libérale', "Chef d'entreprise", 'Salarié', 'Fonctionnaire', 'VRP', 'Etudiant', 'Sans profession', "Recherche d'emploi", 'Ecclasiastique'];
    let res = false;

    arraySituation.forEach(function(element) {
        if(element === sit){
            res = true;
        }
    }, this);

    return res;
}
/** On exporte le controller */
module.exports = {
    getUsers: getUsers,
    postUsers: postUsers,
    getUniqueUser: getUniqueUser,
    updateOneUser : updateOneUser
};