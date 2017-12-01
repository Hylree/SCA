const jwt = require('jsonwebtoken');

const jwtConfig = require('../config/jwt');

const User = require("../models/user");

const authMiddleware = (req, res, next) =>{
    const authToken = req.headers['x-acces-token'];

    if (!authToken){
        res.status(401).send({ success: false, message: 'Authentification required'});
    }else {
        User.finOne({
            
        })
    }

};

module.exports = authMiddleware;