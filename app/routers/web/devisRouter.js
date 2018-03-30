/** On importe les librairies */
const express = require('express');

/** On importe les controllers */
const devisAutoController = require('../../controllers/web/devis/devisAutoController');

/** On déclare notre router */
const devisAutoRouter = express.Router();

/** On déclare les routes */
devisAutoRouter.get('/devis-auto', devisAutoController.view);

/** On exporte le router */
module.exports = devisAutoRouter;