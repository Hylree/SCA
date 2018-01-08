/** On importe les librairies */

/** On importe les modèles */


/** On déclare les fonctions */

const viewHome = (req, res) => {
    console.log('cookies ', req.cookies);
    console.log('=========================');
    
    console.log('session ', req.session);
    console.log('local ', res.locals);
    res.render('pages/vue/home',  req.locals);
}

module.exports = {
    viewHome : viewHome
};