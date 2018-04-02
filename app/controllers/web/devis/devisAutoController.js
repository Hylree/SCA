/** On importe les librairies */

/** On importe les modèles */
const User = require('../../../models/user');
const Human = require('../../../models/human');
const Client = require('../../../models/client');

/** On déclare les fonctions */

const view = (req, res) => {
    
    const flashSuccess = req.session.flashSuccess ? req.session.flashSuccess : [];
    const flashErrors = req.session.flashErrors ? req.session.flashErrors : [];
    const human = req.session.human;

    delete req.session.flashSuccess;
    delete req.session.flashErrors;

    
    Human.Human.
    find({ _id : human._id}).
    populate('user_id client_id conducteur_id').
    exec((err, human) => {    
        res.status(200).render('pages/vue/web/devis/devisAuto',  {
            flashSuccess: flashSuccess,
            flashErrors: flashErrors,
            human : human
        });
    });

}

module.exports = {
    view : view
};