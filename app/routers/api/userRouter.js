/** On importe les librairies */
const express = require('express');

/** On importe les controllers */
const userController = require('../../controllers/api/userController');

/** On déclare notre router */
const userRouter = express.Router();

/** On déclare les routes */
userRouter.get('/', userController.getAllHumans);
userRouter.get('/:id', userController.getUniqueHuman);
userRouter.post('/updateOneUser/:id', userController.updateOneHuman);
userRouter.get('/getUserFilter/:nameFilter', userController.getHumansFilter);

/** On exporte le router */
module.exports = userRouter;