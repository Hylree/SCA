/** On importe les librairies */
const express = require('express');

/** On importe les controllers */
const contactController = require('../controllers/contactController');

/** On déclare notre router */
const contactRouter = express.Router();

/** On déclare les routes */
contactRouter.post('/', contactController.postContact);
contactRouter.get('/', contactController.viewContact);

/** On exporte le router */
module.exports = contactRouter;