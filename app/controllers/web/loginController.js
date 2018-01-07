/** On importe les librairies */
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');

/** On importe les fichiers de configuration */
const jwtConfig = require('../../config/jwt');

/** On importe les modèles */
const User = require('../../models/user');

const viewLogin = (req, res) => {
    res.render('pages/vue/login', req.locals);
}
/** On déclare les fonctions liées aux animaux */
const login = (req, res) => {
    const errors = [];
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password || username === '' || password === '') {
        errors.push("Vous devez renseigné l'identifiant ainsi que le mot de passe.");
        res.cookie('flashErrors', errors);
        res.status(200).redirect( '/login' );
    } else {

        User.findOne({ username: username }, (err, user) => {

            if (!user) {
                errors.push("L'identifiant ou le mot de passe sont invalide.");
                res.cookie('flashErrors', errors);
                res.status(200).redirect( '/login' );
            } else {

                const isPasswordValid = bcrypt.compareSync(password, user.password);

                if (!isPasswordValid) {
                    errors.push("L'identifiant ou le mot de passe sont invalide.");
                    
                    res.cookie('flashErrors', errors);
                    res.status(200).redirect( '/login' );
                } else {

                    jwt.sign({
                        username: username
                    }, jwtConfig.secret, {}, (err, authToken) => {

                        User.findOneAndUpdate({ _id: user._id }, {
                            authToken: authToken,
                            validUntil: new Date((new Date()).setHours((new Date()).getHours() + 1))
                        }, { new: true }, (err, user) => {
                            
                            res.cookie('flashSuccess', ['Vous êtes désormais connectez.']);
                            res.cookie('cookieSession', authToken);
                            res.status(200).redirect( '/' );
                        })

                    });

                }

            }

        });

    }

};

/** On exporte le controller */
module.exports = {
    login: login,
    viewLogin : viewLogin
};