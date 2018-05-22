const jwt = require('jsonwebtoken');

/** On importe les modèles */
const User = require('../models/user');

/** Vérifie si l'utilisateur est administrateur */
const authProfilMiddleware = (req, res, next) => {

    const errors = [];
    if(req.session.profil !== "admin" || req.session.profil == undefined){
        if(req.session.profil !== undefined){
            
            req.session.destroy((err) => {
                errors.push("Vous n'avez pas les autorisations necessaire pour continuer sur cette page. Vous êtes déconnecté.");
                res.cookie('flashErrors', errors);
                res.status(401).redirect( '/' );
            });

        }else{
            errors.push("Vous n'avez pas les autorisations necessaire pour continuer sur cette page.");
            res.cookie('flashErrors', errors);
            res.status(401).redirect( '/' );
        }

        
    }else{
        next();
    }

};

/** On exporte le Middleware */
module.exports = authProfilMiddleware;