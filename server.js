/** On importe les librairies */
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const Promise = require('bluebird');

/** On importe fichiers de configuration */
const databaseConfig = require('./app/config/database');

/** On instancie l'application */
const app = express();

/** On définie le template */
app.set('view engine', 'ejs');
app.use('/assets', express.static('public'));
app.use('/public', express.static('public'));
app.use('/img', express.static('public/img'));
/**Methode static pour les dossiers js */
app.use('/appjs', express.static('public/js/app'));
app.use('/res', express.static('node_modules'));

/** On applique des middlewares */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
    name: 'session',
    secret: 'Jalousies'
}));
app.use(cookieParser());



/** On importe les middlewares */
const authMiddleware = require('./app/middlewares/authMiddleware');
const authProfilMiddleware = require('./app/middlewares/authProfilMiddleware');


/**_______________________________________________________ */
/** On importe les routers */
const authRouter = require('./app/routers/api/authRouter');
const userRouter = require('./app/routers/api/userRouter');


/** On importe les middlewares */


/** On créé le router API */
const apiRouter = express.Router();


apiRouter.use('/auth', authRouter);
apiRouter.use('/users', userRouter);
//apiRouter.use('/users', [authMiddleware, userRouter]);

/** On implémente le router API */
app.use('/api', apiRouter);


/** _____________________________________________________________ */

const registerRouter = require('./app/routers/web/registerRouter');
const homeRouter = require('./app/routers/web/homeRouter');
const loginRouter = require('./app/routers/web/loginRouter');
const postsRouter = require('./app/routers/web/postsRouter');
const listDevisRouter = require('./app/routers/web/list-devis');

/** On créé le router web */
const webRouter = express.Router();

webRouter.use('/login', loginRouter);
webRouter.use('/posts', postsRouter);
webRouter.use('/register', registerRouter);
webRouter.use('/list-devis', listDevisRouter);
webRouter.use('/', homeRouter);

/** On implémente le router Web */
app.use('/', [authMiddleware, webRouter]);


/** -----------------------------------------------------------
 * Section admin
 * ------------------------------------------------------------
 */


const postRouter = require('./app/routers/admin/postRouter');
const adminRouter = require('./app/routers/admin/adminRouter');
const usersRouter = require('./app/routers/admin/usersRouter');

/** On créé le router l'administration */
const adminMainRouter = express.Router();

adminMainRouter.use('/users', usersRouter);
adminMainRouter.use('/post', postRouter);
adminMainRouter.use('/', adminRouter)

app.use('/administration', [authMiddleware, authProfilMiddleware, adminMainRouter]);
/** fin routers 
 * ______________________________________________________________
*/


/** Connexion à la base MongoDB */
Promise.promisifyAll(require('mongoose'));
mongoose.connect(databaseConfig.url, { useMongoClient: true }, (err) => {
    console.log('Connexion établie à la base de données');
});


/** On démarre l'application */
app.listen(3000, () => {
    console.log('Le serveur écoute sur le port 3000');
});

