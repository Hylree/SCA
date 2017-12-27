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

    if(req.body.password !== req.body.password_confirm){
        errors.push("Le mot de passe est invalide");
    }

    req.body.password = bcrypt.hashSync(req.body.password, null);

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
            res.status(400).render({ errors: errors });
        } 
        else {
            if(errors[0] === null){
                Profil.findOne({'id' : 'admin'},(err, profil) => {
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