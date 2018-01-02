/** On importe les librairies */
const express = require('express');

/** On importe les controllers */
const loginController = require('../../controllers/web/loginController');

/** On déclare notre router */
const loginRouter = express.Router();

/** On déclare les routes */
loginRouter.get('/', loginController.viewLogin);
loginRouter.post('/', loginController.login);

/** On exporte le router */
module.exports = loginRouter