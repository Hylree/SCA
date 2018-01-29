
const formidable = require('formidable');
/** On importe les modèles */
const Post = require('../../models/post');


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
                
                console.log(fields.message);
                
                console.log("pour qsdfqsdf: ");
                console.log(arrayOfFiles);
                if(arrayOfFiles.length > 0){
                    var fileNames = [];

                    arrayOfFiles.forEach((eachFile) => {
                        fileNames.push(eachFile.files.name);
                    });


                    res.status(201).redirect('/administration/post');
                    Post.create(fields, (err, message) => {
                        Post.update({ _id: message._id }, { $set: { path : fileNames}});
                    });

                }else{
                    res.status(400).redirect('/administration/post');
                }
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