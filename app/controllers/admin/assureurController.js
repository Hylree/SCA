
/** Initialisation de la vue pour la gestion des Assureurs */
const assureursView = (req, res) => {
    
    const flashSuccess = req.session.flashSuccess ? req.session.flashSuccess : [];
    const flashErrors = req.session.flashErrors ? req.session.flashErrors : [];

    delete req.session.flashSuccess;
    delete req.session.flashErrors;


    res.render('pages/vue/admin/assureur',  {
        flashSuccess: flashSuccess,
        flashErrors: flashErrors
    });
}

/** On exporte les controller */
module.exports = {
    assureursView : assureursView
};