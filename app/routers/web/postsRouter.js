/** On importe les librairies */
const express = require('express');

/** On importe les controllers */
const postsController = require('../../controllers/web/postsController');

/** On déclare notre router */
const postsRouter = express.Router();

/** On déclare les routes */
postsRouter.get('/', postsController.postsView);

/** On exporte le router */
module.exports = postsRouter