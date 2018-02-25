/** On importe les librairies */


/** On importe les modèles */


/** On déclare les fonctions */

const usersView = (req, res) => {
    
    const flashSuccess = req.session.flashSuccess ? req.session.flashSuccess : [];
    const flashErrors = req.session.flashErrors ? req.session.flashErrors : [];

    delete req.session.flashSuccess;
    delete req.session.flashErrors;


    res.render('pages/vue/admin/users',  {
        flashSuccess: flashSuccess,
        flashErrors: flashErrors
    });
}

module.exports = {
    usersView : usersView
};