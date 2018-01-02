/** On importe les modèles */
const Contact = require('../../models/contact');


const postContact = (req, res) =>{

    Contact.create(req.body, (err, message) => {
        res.status(201).render('pages/vue/contact');
    });
}

const viewContact = (req, res) =>{
        res.render('pages/vue/contact');
}


/** On exporte le controller */
module.exports = {
    postContact: postContact,
    viewContact: viewContact
};