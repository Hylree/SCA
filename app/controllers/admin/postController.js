
/**On importe les librairies */
const formidable = require('formidable');
/** On importe les modèles */
const Post = require('../../models/post');

const Image = require('../../models/image/post/imagePost');

const postPost = (req, res) =>{

        var form = new formidable.IncomingForm();

            form.keepExtensions = true;
            form.multiples = true;
            form.uploadDir = 'public/img/posts';

            form.on('field', (name, field) => {
                console.log('Got file: ', name.message);
            })

            form.parse(req, (err, fields, files) => {
                if(err){
                    res.status(400).send('error');
                }

                var arrayOfFiles = [];
                if(files instanceof Array){
                    arrayOfFiles = files;
                }else{
                    arrayOfFiles.push(files);
                }


                if(arrayOfFiles.length > 0){
                    var fileNames = [];

                    Post.create({message: fields.message}, async (err, post) => {

                        for (eachFile of arrayOfFiles){
                            console.log("eachFile");
                            console.log(eachFile);
                            Image.Image.create(eachFile.files, async (err, images) => {
                                

                                for(image of images){
                                    console.log("image");
                                    console.log(image);
                                    Image.RelationImage.create({id_image: image._id, id_post: post._id}, async (err, relationimagePost) => {
                                        console.log("relationimage");
                                        console.log(relationimagePost);
                                    });
                                }
                                
                            });


                        }
                        
                        res.status(201).redirect('/administration/post');
                    });

                }else{
                    res.status(400).redirect('/administration/post');
                }
            });



}

const viewPost = (req, res) =>{

    const flashSuccess = req.session.flashSuccess ? req.session.flashSuccess : [];
    const flashErrors = req.session.flashErrors ? req.session.flashErrors : [];

    delete req.session.flashSuccess;
    delete req.session.flashErrors;

    res.render('pages/vue/admin/post',  {
        flashSuccess: flashSuccess,
        flashErrors: flashErrors
    });
}


/** On exporte le controller */
module.exports = {
    postPost: postPost,
    viewPost: viewPost
};