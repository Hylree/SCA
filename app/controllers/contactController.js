/** On importe les modèles */
const Contact = require('../models/contact');


const postContact = (req, res) =>{

    Contact.create(req.body, (err, message) => {
        if (err) throw err;
        res.status(201).render('pages/formulaire_contact');
    });
}

const viewContact = (req, res) =>{
        res.render('pages/formulaire_contact');
}


/** On exporte le controller */
module.exports = {
    postContact: postContact,
    viewContact: viewContact
};