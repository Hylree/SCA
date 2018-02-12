/** On importe les librairies */
const bcrypt = require('bcrypt-nodejs');
const url = require('url');
const cookie = require('cookie-parser');

/** On importe les modèles */
const User = require('../../models/user');
const Profil = require('../../models/profil');

/** On déclare les fonctions */

const viewRegister = (req, res) => {

    const flashSuccess = req.session.flashSuccess ? req.session.flashSuccess : [];
    const flashErrors = req.session.flashErrors ? req.session.flashErrors : [];

    delete req.session.flashSuccess;
    delete req.session.flashErrors;

    res.render('pages/vue/web/register',  {
        flashSuccess: flashSuccess,
        flashErrors: flashErrors
    });
}

const postRegister = (req, res) => {
    const errors = [];
    const dateNow = new Date();
    const cp = req.body.code;
    const typeHab = req.body.home_type;
    const regex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/gmi;


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
    
        req.body.date_naissance = new Date(req.body.bday);
    }
            

    if(cp.length !== 5){
        errors.push("Le code postale doit contenir 5 caractères" + cp);
    }

    if(checkTypeHab(typeHab) === false ){
        errors.push("Le type de logement est invalide." + req.body.home_type);
    }

    if(checkQualityForHab(req.body.tenant_type) === false){
        errors.push("La qualité de l'occupant est invalide. " + req.body.tenant_type);
    }

    if(checkSituationFamily(req.body.situation_fam) === false){
        errors.push("La situation de famille est invalide." + req.body.situation_fam);
    }

    if(checkSituationPro(req.body.situation_pro) === false){
        errors.push("La situation professionnel est invalide. " + req.body.situation_pro);
    }
    

    Profil.findOne({'id' : 'prospect'}, (err, profil) => {
        req.body.profil = profil.id;
        const user = new User(req.body);
        user.save((err, user) => {
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
                
                res.status(200).render('pages/vue/web/register', { flashErrors : errors } );
                
            }
            else {
                let success = [];
                success.push("Compte enregistré.");
                //res.cookie('flashSuccess', ['Bravo']);
                res.status(200).render('pages/vue/web/home', { flashSuccess : success } );                
                //res.status(201).redirect( '/' );
            }
        });
    });

    
}

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
/**  POur récupérer un utilisateur avec le profil 
 User.findOne({ username : 'Superman'}).populate('profil').exec((err, person) => {
    onsole.log(person);
});
*/

/** On exporte le controller */
module.exports = {
    viewRegister : viewRegister,
    postRegister: postRegister
};