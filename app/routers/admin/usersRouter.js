/** On importe les librairies */
const express = require('express');

/** On importe les controllers */
const usersController = require('../../controllers/admin/usersController');

/** On déclare notre router */
const usersRouter = express.Router();

/** On déclare les routes */
usersRouter.get('/', usersController.usersView);

/** On exporte le router */
module.exports = usersRouter;