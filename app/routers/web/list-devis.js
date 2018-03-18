/** On importe les librairies */
const express = require('express');

/** On importe les controllers */
const listDevisController = require('../../controllers/web/listDevisController');

/** On déclare notre router */
const listDevisRouter = express.Router();

/** On déclare les routes */
listDevisRouter.get('/', listDevisController.viewHome);

/** On exporte le router */
module.exports = listDevisRouter;