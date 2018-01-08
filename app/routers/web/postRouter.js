/** On importe les librairies */
const express = require('express');

/** On importe les controllers */
const postController = require('../../controllers/web/postController');

/** On déclare notre router */
const postRouter = express.Router();

/** On déclare les routes */
postRouter.get('/', postController.viewPost);
postRouter.post('/register', postController.postPost);

/** On exporte le router */
module.exports = postRouter;