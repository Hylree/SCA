/** On importe les modèles */
const Post = require('../../models/post');


const postPost = (req, res) =>{

    Post.create(req.body, (err, message) => {
        res.status(201).redirect('/post');
    });
}

const viewPost = (req, res) =>{
        res.render('pages/vue/post');
}


/** On exporte le controller */
module.exports = {
    postPost: postPost,
    viewPost: viewPost
};