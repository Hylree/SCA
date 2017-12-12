/** On importe les librairies */
const express = require('express');

/** On importe les controllers */
const registerController = require('../../controllers/web/registerController');

/** On déclare notre router */
const registerRouter = express.Router();

/** On déclare les routes */
registerRouter.get('/', registerController.viewRegister);
registerRouter.post('/', registerController.postRegister);

/** On exporte le router */
module.exports = registerRouter