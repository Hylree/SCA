/** On importe les librairies */
const express = require('express');

/** On importe les controllers */
const contactController = require('../../controllers/web/contactController');

/** On déclare notre router */
const contactRouter = express.Router();

/** On déclare les routes */
contactRouter.get('/', contactController.viewContact);
contactRouter.post('/register', contactController.postContact);

/** On exporte le router */
module.exports = contactRouter;