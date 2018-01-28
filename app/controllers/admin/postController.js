/** On importe les modèles */
const Post = require('../../models/post');


const postPost = (req, res) =>{

    Post.create(req.body, (err, message) => {
        

        if(!req.files){
            return res.status(400).send('Pas de fichier a envoyer.')
        }else{

            let sampleFile = req.files.sampleFile;
    
            sampleFile.mv('/asset/img/posts/filename', (err) => {
                if(err){
                    return res.status(500).send(err);
                }
                
            });
        }

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