/** On importe les librairies */
const express = require('express');

/** On importe les controllers */
const homeController = require('../../controllers/web/homeController');

/** On déclare notre router */
const homeRouter = express.Router();

/** On déclare les routes */
homeRouter.get('/', homeController.viewHome);

/** On exporte le router */
module.exports = homeRouter;