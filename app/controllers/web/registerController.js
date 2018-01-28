/** On importe les librairies */
const bcrypt = require('bcrypt-nodejs');
const url = require('url');
const cookie = require('cookie-parser');

/** On importe les modèles */
const User = require('../../models/user');
const Profil = require('../../models/profil');

/** On déclare les fonctions */

const viewRegister = (req, res) => {
    res.render('pages/vue/web/register', req.locals);
}

const postRegister = (req, res) => {
    const errors = [];
    const dateNow = new Date();
    let dateRes;
    const cp = req.body.code;
    const typeHab = req.body.home_type;
    let date = req.body.bday;
    let   year, month, day;
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
        year = req.body.year;
        month = testMonthWord(req.body.month);
        day = req.body.day;

    }else{
        year = date.substring(0,4),
        month = date.substring(5,7),
        day = date.substring(8,10);

    }

    console.log(day + ' ' + month + ' ' + year);
    dateRes = month + '.' + day + '.' + year;
    //dateRes.setFullYear(year);
    //dateRes.setMonth(month);
    //dateRes.setDate();
            

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
        errors.push("La suitation de famille esti nvalide." + req.body.situation_fam);
    }

    if(checkSituationPro(req.body.situation_pro) === false){
        errors.push("La situation proféssionnel est invalide. " + req.body.situation_pro);
    }
    
    req.body.date_naissance = new Date(dateRes);

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
                res.cookie('flashErrors', errors);
                res.status(201).redirect('/register');
                
            }
            else {
                
                res.cookie('flashSuccess', ['Bravo']);
                res.status(201).redirect( '/' );
            }
        });
    });

    
}

function testMonthWord(month){

    const arrayMonthTest = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    let res = 0;
    arrayMonthTest.forEach(function(element, index) {
        if(element == month){
            res = index + 1 ;
            if(res < 10){
                res = '0' + res.toString();
            }else{
                
            res = res.toString();
            }
        }
    }, this);

    return res;
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