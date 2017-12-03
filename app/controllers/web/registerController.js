/** On importe les librairies */
const bcrypt = require('bcrypt-nodejs');

/** On importe les modèles */
const User = require('../../models/user');


/** On déclare les fonctions */

const viewRegister = (req, res) => {
    res.render('pages/vue/register');
}

const postRegister = (req, res) => {

    let valid;

    User.create(req.body, (err, user) => {
        if (err) throw err;

        if(req.body.password != req.body.password_confirm){
            valid = false;
        }

        if(err){

            valid = false;
        }
        
        if(valid == false){
            res.status(400).render('pages/vue/register');
            console.log("result: ", err)
        }else if(valid == true ){
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