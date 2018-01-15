/** On importe les modèles */
const Post = require('../../models/post');


const postPost = (req, res) =>{

    Post.create(req.body, (err, message) => {
        res.status(201).redirect('/administration/post');
    });
}

const viewPost = (req, res) =>{
        res.render('pages/vue/admin/post');
}


/** On exporte le controller */
module.exports = {
    postPost: postPost,
    viewPost: viewPost
};