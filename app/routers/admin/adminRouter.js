/** On importe les librairies */
const express = require('express');

/** On importe les controllers */
const adminController = require('../../controllers/admin/adminController');

/** On déclare notre router */
const adminRouter = express.Router();

/** On déclare les routes */
adminRouter.get('/', adminController.viewAdmin);

/** On exporte le router */
module.exports = adminRouter;