/** Initialisation de la page d'acceuil */
const viewHome = (req, res) => {

    flashSuccess = req.session.flashSuccess ? req.session.flashSuccess : [];
    flashErrors = req.session.flashErrors ? req.session.flashErrors : [];

    delete req.session.flashSuccess;
    delete req.session.flashErrors;

    
    res.render('pages/vue/web/home',  {
        flashSuccess: flashSuccess,
        flashErrors: flashErrors
    });
}

/** On export les controllers */
module.exports = {
    viewHome : viewHome
};