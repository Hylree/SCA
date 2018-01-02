/** On importe les librairies */
const jwt = require('jsonwebtoken');

/** On importe les fichiers de configuration */
const jwtConfig = require('../config/jwt');

/** On importe les modèles */
const User = require('../models/user');

/** On créée le Middleware */
const authMiddleware = (req, res, next) => {

    const errors = [];
    if(req.cookies.cookieSession){
        const authToken = req.cookies.cookieSession.authToken;
        
            console.log(authToken);
            if (!authToken) {
                res.status(401).send({ success: false, message: 'Authentication required.' });
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
                                        
                                        next();
                                    });
                                }
                            });
                        }
                    }
        
                });
        
            }
    }else{
        next();
    }


   

};

/** On exporte le Middleware */
module.exports = authMiddleware;