/** On importe les modèles */
const Post = require('../../models/post');

const postsView = (req, res) => {
    Post.find({}, (err, posts) => {
        console.log("test" + posts);
    //res.status(200).send({posts : posts});
    res.render('pages/vue/web/posts', {posts : posts});
    });
}

module.exports = {
    postsView : postsView
};