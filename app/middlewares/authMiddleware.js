/** On importe les librairies */
const jwt = require('jsonwebtoken');

/** On importe les fichiers de configuration */
const jwtConfig = require('../config/jwt');

/** On importe les modèles */
const User = require('../models/user');

/** vérifie l'authentification si il est valide ou non*/
const authMiddleware = (req, res, next) => {

    const errors = [];
    if(req.session.authToken){
        const authToken = req.session.authToken;
        
            console.log(authToken);
            if (!authToken) {
                errors.push("La session n'est plus valide, reconnectez-vous.");
                res.cookie('flashErrors', errors);
                next();
                
            } else {
        
                User.findOne({ authToken: authToken }, (err, user) => {
        
                    if (!user) {
                    errors.push("La session n'est plus valide, reconnectez-vous.");
                    res.cookie('flashErrors', errors);
                    next();
                        
                    } else {
                        const actualTime = (new Date()).getTime();
                        const userTime = (new Date(user.validUntil)).getTime();
            
                        if (userTime < actualTime) {
                            errors.push("La session à expiré. Reconnectez-vous.");
                            res.cookie('flashErrors', errors);
                        } else {
                            jwt.verify(authToken, jwtConfig.secret, {}, (err, decoded) => {
                                if (err) {
                                    errors.push("La sessions est invalide. Reconnectez-vous.");
                                    res.cookie('flashErrors', errors);
                                    next();
                                } else {
                                    User.findOneAndUpdate({ _id: user._id }, { 
                                        validUntil: new Date((new Date()).setHours((new Date()).getHours() + 1)) 
                                    }, { new: true }, (err, user) => {
                                        res.locals.authToken = authToken;
                                        res.locals.profil = user.profil;
                                        next();
                                    });
                                }
                            });
                        }
                    }
        
                });
        
            }
    }else{
                            

        req.session.destroy((err) => {
            res.status(200).redirect( '/' );
        });
        next();
    }


   

};

/** On exporte le Middleware */
module.exports = authMiddleware;