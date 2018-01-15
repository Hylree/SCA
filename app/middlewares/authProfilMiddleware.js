const jwt = require('jsonwebtoken');

/** On importe les modèles */
const User = require('../models/user');

/** On créée le Middleware */
const authProfilMiddleware = (req, res, next) => {

    const errors = [];
    if(req.session.profil !== "admin" || req.session.profil == undefined){
        if(req.session.profil !== undefined){

            req.session.destroy((err) => {
                res.status(401).redirect( '/' );
            });

        }
        next();
    }else{
        next();
    }


   

};

/** On exporte le Middleware */
module.exports = authProfilMiddleware;