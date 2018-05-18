/** On importe les modèles */
const Post = require('../../models/post');
const Image = require('../../models/image/post/imagePost');

/** Initialisation de la vue de l'affichage des posts */
const postsView = (req, res) => {

    const flashSuccess = req.session.flashSuccess ? req.session.flashSuccess : [];
    const flashErrors = req.session.flashErrors ? req.session.flashErrors : [];

    delete req.session.flashSuccess;
    delete req.session.flashErrors;
    
    /** Recherche des posts */
    Post.find({}, async (err, posts) => {
        const numberPosts = posts.length;
        let arrayPosts = [];

        for (post of posts) {
            let relationsImagesTab = await Image.RelationImage.find({id_post : post._id}).exec();
            let object = { post: post, images: [] };

            for (relation of relationsImagesTab) {

                object.images.push(await Image.Image.findOne({ _id: relation.id_image }).exec());

            };

            arrayPosts.push(object);
        };

        res.render('pages/vue/web/posts',  {
            flashSuccess: flashSuccess,
            flashErrors: flashErrors,
            posts : arrayPosts
            
        });
    });
}

/** On exporte les controllers */
module.exports = {
    postsView : postsView
};