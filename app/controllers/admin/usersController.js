/** On importe les librairies */



/** Initialitation de la vue de la page de gestion des utilisateur */
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

/** On exporte les controllers */
module.exports = {
    usersView : usersView
};