/** On importe les modèles */


const viewAdmin = (req, res) =>{

    const flashSuccess = req.session.flashSuccess ? req.session.flashSuccess : [];
    const flashErrors = req.session.flashErrors ? req.session.flashErrors : [];

    delete req.session.flashSuccess;
    delete req.session.flashErrors;

    res.render('pages/vue/admin/admin',  {
        flashSuccess: flashSuccess,
        flashErrors: flashErrors
    });
}


/** On exporte le controller */
module.exports = {
    viewAdmin: viewAdmin
};