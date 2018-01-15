/** On importe les modèles */


const viewAdmin = (req, res) =>{
        res.render('pages/vue/admin/admin');
}


/** On exporte le controller */
module.exports = {
    viewAdmin: viewAdmin
};