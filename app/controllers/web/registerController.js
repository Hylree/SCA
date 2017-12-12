/** On importe les librairies */
const bcrypt = require('bcrypt-nodejs');

/** On importe les modèles */
const User = require('../../models/user');


/** On déclare les fonctions */

const viewRegister = (req, res) => {
    res.render('pages/vue/register');
}

const postRegister = (req, res) => {


    User.create(req.body, (err, user) => {
        if (err) {
            const errors = [];
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
        } else {
            res.status(201).render('pages/vue/register');
        }        
    });
/**
req.body.password = bcrypt.hashSync(req.body.password, null);
    
User.create(req.body, (err, user) => {
    if (err) {
        res.status(400).send({ success: false, error: err });
    } else {
        res.status(201).send({ success: true, user: user });
    }
});

 */

}

/** On exporte le controller */
module.exports = {
    viewRegister : viewRegister,
    postRegister: postRegister
};