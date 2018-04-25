/** On importe les librairies */
const bcrypt = require('bcrypt-nodejs');

/** 
 * On importe les modèles
 * !!! Il faut importer les modules pour les populates !!!
 *  */
const User = require('../../models/user');
const Human = require('../../models/human');
const Client = require('../../models/client');
const Conducteur = require('../../models/conducteur');

/** On importe de ficher des fonctions de l'application */
const FunctionApp = require('../../functions/appFunctions');

/** On déclare les fonctions liées aux animaux */
  

/**
 * Récupere tout les humains avec les références
 */
const getAllHumans = (req, res) => {
    Human.Human.
    find().
    populate('user_id client_id conducteur_id').
    exec((err, humans) => {
        res.status(200).send({sucess: true, users : humans});
    });

};

/**
 * Permet de récuperer les Humans triés
 */
const getUsersFilter = (req, res) => {

    const nameFilter = req.params.nameFilter;

    Human.Human.
    find({}).
    sort(nameFilter).
    populate('user_id client_id conducteur_id').
    exec((err, humans) => {
        res.status(200).send({sucess: true, users : humans});
    });

};

/** 
 * Permet de modifier un utilisateur
*/
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

/**
 * Permet de récuperer un seul utilisateur grâce à son id
 */
const getUniqueUser = (req, res) => {
    let id = req.params.id;

    Human.Human.
    find({ _id : id}).
    populate('user_id client_id conducteur_id').
    exec((err, human) => {
        res.status(200).send({sucess: true, user: human});
    });
};

/**
 * permet de modifier un utilisateur grace à sont id
 */
const updateOneUser = (req, res) => {
    
    const id = req.params.id; //Récuperation de l'id de du client
    const errors = [];
    const success = [];
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

        let date = req.body.bday;
        var chunks = date.split('/');
        var formattedDate = [chunks[1],chunks[0],chunks[2]].join("/");
        console.log(formattedDate);
        req.body.date_naissance = new Date(formattedDate);

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

            
            var humanFindById = Human.Human.findByIdAndUpdate(id, {$set :req.body}).exec();
            humanFindById.then((human) => {
                return User.findByIdAndUpdate(human.user_id, {$set :req.body});
            }).then((user) => {
                return Client.Client.findByIdAndUpdate(human.client_id, {$set :req.body});
            }).then((client) => {
                success.push("L'humain est modifié.");
                res.status(200).render('pages/vue/admin/users', { flashSuccess : success});
            }).catch((err) => {
                res.status(200).render('pages/vue/admin/users', { flashErrors : errors});
            });
    
};

/** On exporte le controller */
module.exports = {
    getAllHumans: getAllHumans,
    postUsers: postUsers,
    getUniqueUser: getUniqueUser,
    updateOneUser : updateOneUser,
    getUsersFilter :getUsersFilter
};