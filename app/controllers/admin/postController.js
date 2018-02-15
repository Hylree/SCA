
const formidable = require('formidable');
/** On importe les modèles */
const Post = require('../../models/post');

const Image = require('../../models/image');

const postPost = (req, res) =>{


    console.log(req.body);

    
        console.log(req);


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


                console.log("pour files: ");
                
                console.log(fields);
                
                console.log("pour qsdfqsdf: ");
                console.log(arrayOfFiles);


/*
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
            
*/

                if(arrayOfFiles.length > 0){
                    var fileNames = [];

                    Post.create({message: fields.message}, async (err, post) => {

                        //arrayOfFiles.forEach((eachFile) => {
                        
                            console.log("eachFile");
                            console.log(arrayOfFiles);

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
                            
                           /* console.log(eachFile);
                            Image.Image.create(eachFile.files, (err, image) => {

                                Image.RelationImage.create({id_image: image._id , id_post: post._id }, (err, relationimagePost) => {

                                }); 
                                
                            });
                        });*/
                        
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