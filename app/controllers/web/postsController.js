/** On importe les modèles */
const Post = require('../../models/post');
const Image = require('../../models/image');

const postsView = (req, res) => {


    const flashSuccess = req.session.flashSuccess ? req.session.flashSuccess : [];
    const flashErrors = req.session.flashErrors ? req.session.flashErrors : [];

    delete req.session.flashSuccess;
    delete req.session.flashErrors;


    
    Post.find({}, (err, posts) => {
        const numberPosts = posts.length;
        let arrayPosts = [];
            posts.forEach((post) => {
                Image.RelationImage.find({id_post : post._id}, (err, relationImages) => {
                    //ici a modifié
                    if(relationImages.length == 0){
                        relationImages.forEach((relationImage) => {
                            Image.Image.find({_id : relationImage.id_image}, (err, images) => {
                                
                                arrayPosts.push({post : post, images: images});
                            });
                        });
                    }else{
                        
                    arrayPosts.push({post : post});
                    }

                    
                });
            });
        console.log("number post : " + numberPosts);
        console.log( arrayPosts);
        //console.log("test" + posts);
    //res.status(200).send({posts : posts});
        res.render('pages/vue/web/posts',  {
            flashSuccess: flashSuccess,
            flashErrors: flashErrors,
            posts : arrayPosts
        });
    });
}

module.exports = {
    postsView : postsView
};