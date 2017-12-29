/** On importe les librairies */

/** On importe les modèles */


/** On déclare les fonctions */

const viewHome = (req, res) => {


    //console.log('test', req.locals);
    res.render('pages/vue/home',  req.locals);
}

module.exports = {
    viewHome : viewHome
};