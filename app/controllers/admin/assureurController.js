


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

module.exports = {
    assureursView : assureursView
};