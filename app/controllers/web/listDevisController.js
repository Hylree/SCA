/** Initialisation de la page de la liste des demandes de devis */
const viewHome = (req, res) => {
    
    const flashSuccess = req.session.flashSuccess ? req.session.flashSuccess : [];
    const flashErrors = req.session.flashErrors ? req.session.flashErrors : [];

    delete req.session.flashSuccess;
    delete req.session.flashErrors;

    res.render('pages/vue/web/list-devis',  {
        flashSuccess: flashSuccess,
        flashErrors: flashErrors
    });
}

/** On exporte les controllers */
module.exports = {
    viewHome : viewHome
};