/** On importe les librairies */
const bcrypt = require('bcrypt-nodejs');

/** On importe les modèles */
const User = require('../../models/user');
const Profil = require('../../models/profil');

/** On déclare les fonctions */

const viewRegister = (req, res) => {
    res.render('pages/vue/register');
    

}

const postRegister = (req, res) => {
    const errors = [];
    const dateNow = new Date();
    let dateForm = new Date();
    const cp = req.body.code;
    const typeHab = req.body.home_type;
    const resTestMonth = testMonthWord(req.body.mont);
    const regex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/gmi;
    
    if(req.body.password !== req.body.password_confirm){
        errors.push("Le mot de passe est invalide");
    }else{
        req.body.password = bcrypt.hashSync(req.body.password, null);
    }


    if(req.body.civilite !== 'Mme' || req.body.civilite !== 'M'){
        errors.push("La civilité est mal renseigné. Civilité : " + req.body.civilite + '.');
    }

    if(regex.test(req.body.tel) === false){
        errors.push("Le téléphone n'a pas la bonne forme: " + req.body.tel);
    }

    if(req.body.day >= 1 && req.body.day <= 31){
        if(req.body.month >= 1 && req.body.month <= 12 ){
            if(req.body.year <= dateNow.getFullYear() && req.body.year >= dateNow.getFullYear() - 100){
                dateForm.setFullYear(req.body.year);
                dateForm.setMonth(req.body.month);
                dateForm.setDate(req.body.day);
            }else{
                errors.push("L'année de naissance est invalide" + req.body.year);
            }
        }else{
            errors.push("Le mois de naissance est invalide");
            if(req.body.year <= dateNow.getFullYear() && req.body.year >= dateNow.getFullYear() - 100){

                errors.push("UNE ERREUR INCONNU EST SURVENUE. Informez notre service.");
                
            }else{
                errors.push("L'année de naissance est invalide");
            }
        }
    }else{
        errors.push("Le jour de la date de naissance est invalide." + req.body.day);
        if(req.body.month >= 1 && req.body.month <= 12 ){
            if(req.body.year <= dateNow.getFullYear() && req.body.year >= dateNow.getFullYear() - 100){

            errors.push("UNE ERREUR INCONNU EST SURVENUE. Informez notre service.");

            }else{

            errors.push("L'année de naissance est invalide" + req.body.year);
            }
        }else{
            erros.push("Le mois de naissance est invalide. " +  req.body.month)

            if(req.body.year <= dateNow.getFullYear() && req.body.year >= dateNow.getFullYear() - 100){
                errors.push("UNE ERREUR INCONNU EST SURVENUE. Informez notre service.");
            
            }else{
                errors.push("L'année de naissance est invalide");
            }
        }
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
        errors.push("La suitation de famille esti nvalide." + req.body.situation_fam);
    }

    if(checkSituationPro(req.body.situation_pro) === false){
        errors.push("La situation proféssionnel est invalide. " + req.body.situation_pro);
    }
    
    req.body.date_naissance = dateForm;
    const user = new User(req.body);

    user.save((err, user) => {

        if (err) {
            if(err.code === 11000){
                errors.push("L'utilisateur existe déjà.");
            }else{
                for (const error in err.errors) {
                    if (err.errors[error].name === 'ValidatorError') {
                        errors.push(err.errors[error].properties.message);
                    }
                }
            }
            res.status(400).render('pages/vue/register', { errors: errors });
        } 
        else {
            if(errors[0] === null){
                Profil.findOne({'id' : 'prospect'},(err, profil) => {
                    user.profil = profil._id;
                    user.save();
                    //console.log(err);     
                });

            res.status(201).render('pages/vue/registe');
            }
        }


        console.log(user);
    });
}

function testMonthWord(month){

    const arrayMonthTest = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre'];
    let res = 0;
    arrayMonthTest.forEach(function(element, index) {
        if(element == month){
            res = index + 1 ;
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
    const arraySitation = ['Clélibataire', 'Marié', 'Concubinage', 'Séparer', 'Divorcé', 'Veuf', 'Pacs'];
    let res = false;

    arraySitation.forEach(function(element) {
        if(element === sit){
            res = true;
        }
    }, this);
    return res;
}

function checkSituationPro(sit){
    const arraySituation = ['Artisan', 'Exploitant agricole', 'Profession libéral', 'Chef d\'entreprise', 'Salarié', 'Fonctionnaire', 'VRP', 'Etudiant', 'Sans profession', 'Recherche d\'emploi', 'Ecclasiastique'];
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