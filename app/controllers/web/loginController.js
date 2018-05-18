/** On importe les librairies */
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const url = require('url');
/** On importe les fichiers de configuration */
const jwtConfig = require('../../config/jwt');

/** On importe les modèles */
const User = require('../../models/user');
const Human = require('../../models/human');
const Client = require('../../models/client');

/** Initialisation de la vue de connexion utilisateur */
const viewLogin = (req, res) => {
    res.render('pages/vue/web/login', req.locals);
}

/** Connexion de l'utilisateur */
const login = (req, res) => {
    const errors = [];
    const success = [];
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password || username === '' || password === '') {
        errors.push("Vous devez renseigné l'identifiant ainsi que le mot de passe.");
        //res.cookie('flashErrors', errors);
        res.status(200).render('pages/vue/web/login', { flashErrors : errors});
        //res.status(200).redirect( '/login' );
    } else {
        
    
        User.findOne({ username: username }, (err, user) => {

            if (!user) {
                errors.push("L'identifiant ou le mot de passe sont invalide.");

                res.status(200).render('pages/vue/web/login', { flashErrors : errors});
            } else {

                const isPasswordValid = bcrypt.compareSync(password, user.password);

                if (!isPasswordValid) {
                    errors.push("L'identifiant ou le mot de passe sont invalide.");
                    res.status(200).render('pages/vue/web/login', { flashErrors : errors});
                } else {

                    jwt.sign({
                        username: username
                    }, jwtConfig.secret, {}, (err, authToken) => {

                    var userUpdate = User.findByIdAndUpdate(user._id, {
                            authToken: authToken,
                            validUntil: new Date((new Date()).setHours((new Date()).getHours() + 1))
                        },{new: true}).exec();
                    userUpdate.then((user) => {
                        
                        Human.Human.find({ user_id: user._id }).
                        populate('user_id').
                        then((human) => {
                            
                            req.session.authToken = human[0].user_id.authToken;
                            req.session.username = human[0].user_id.username;
                            req.session.profil = human[0].user_id.profil;
                            req.session.human = human[0];

                            success.push("Vous êtes désormais connecté.");
                            req.session.flashSuccess = success;

                            
                        res.status(200).redirect( '/' );
                        });
                    });



                    });

                }

            }

        });

    }

};

/** Déconnexion de l'utilisateur */
const logout = (req, res) => {

    req.session.destroy((err) => {
        if (err) throw err;
        
        res.cookie('flashSuccess', ['Vous êtes désormais deconnecté.']);
        //res.cookie('cookieSession', authToken);
        res.status(200).redirect( '/' );
    });
};

/** On exporte les controllers */
module.exports = {
    login: login,
    viewLogin : viewLogin,
    logout: logout
}