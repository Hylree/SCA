/** On importe les librairies */
const express = require('express');

/** On importe les controllers */
const userController = require('../../controllers/api/userController');

/** On déclare notre router */
const userRouter = express.Router();

/** On déclare les routes */
userRouter.get('/', userController.getAllHumans);
userRouter.get('/:id', userController.getUniqueUser);
userRouter.post('/updateOneUser/:id', userController.updateOneUser);
userRouter.get('/getUserFilter/:nameFilter', userController.getUsersFilter);

/** On exporte le router */
module.exports = userRouter;