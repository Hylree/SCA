/** On importe les librairies */
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');

/** On importe fichiers de configuration */
const databaseConfig = require('./app/config/database');

/** On instancie l'application */
const app = express();

/** On définie le template */
app.set('view engine', 'ejs');
app.use('/assets', express.static('public'));
app.use('/res', express.static('node_modules'));

/** On applique des middlewares */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
    secret: 'Jalousies',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false}
}));


/**_______________________________________________________ */
/** On importe les routers */
const animalRouter = require('./app/routers/api/animalRouter');
const authRouter = require('./app/routers/api/authRouter');
const userRouter = require('./app/routers/api/userRouter');

/** On importe les middlewares */
const authMiddleware = require('./app/middlewares/authMiddleware');

/** On créé le router API */
const apiRouter = express.Router();


apiRouter.use('/animals', animalRouter);
apiRouter.use('/auth', authRouter);
apiRouter.use('/users', [authMiddleware, userRouter]);

/** On implémente le router API */
app.use('/api', apiRouter);


/** _____________________________________________________________ */

const contactRouter = require('./app/routers/web/contactRouter');
const registerRouter = require('./app/routers/web/registerRouter');
/** On créé le router web */
const webRouter = express.Router();

webRouter.use('/contact', contactRouter);
webRouter.use('/register', registerRouter);

/** On implémente le router Web */
app.use('/', webRouter);

/** fin routers 
 * ______________________________________________________________
*/


/** Connexion à la base MongoDB */
mongoose.connect(databaseConfig.url, { useMongoClient: true }, (err) => {
    if (err) throw err;
    console.log('Connexion établie à la base de données');
});


/** On démarre l'application */
app.listen(3000, () => {
    console.log('Le serveur écoute sur le port 3000');
});

