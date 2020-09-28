

import express from 'express'

import mongoose from 'mongoose'

import multer from 'multer'

const storage = multer.diskStorage({

    destination:function(req,file,cb){
        cb(null, './uploads/');
    },
    filename:function(req,file,cb){
 cb(null, file.originalname);
    },

});

const upload=multer({storage:storage});

mongoose.connect('mongodb+srv://node-shop:node-shop@node-shop.satrg.mongodb.net/node-shop?retryWrites=true&w=majority',


     {useNewUrlParser: true , useUnifiedTopology:true, useCreateIndex: true}


 );



import Blog from '../models/blog'
//import blogController from'../controllers/blogController'
const router = express.Router()
//router.get('/',blogController.getall)
router.get('/', (req,res,next) => {
    Blog.find()
    .select('_id articleTitle articleName blogImage')
    .exec()
    .then(docs => {
        
        const response = {
            count:docs.length,
            blogs:docs.map(doc =>{
 
     return {
            articleTitle:doc.articleTitle,
            articleName:doc.articleName, 
            blogImage:doc.blogImage,
             _id:doc._id,
              request:{
                 type:'GET',
                  url:'https/blog/' + doc._id
             }
                }
 
            })
              
        }; 
        res.status(200).json(response);
 
       }) 
    
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error:err
            });
    })
 });
 router.post('/', upload.single('blogImage'), (req,res,next) =>{

    console.log(req.file);
      const blog = new Blog({
       _id: new mongoose.Types.ObjectId(),
       articleTitle:req.body.articleTitle,
       articleName:req.body.articleName,
       blogImage:req.file.path
      });
      blog
      .save()
      .then(result => {
          console.log(result);
           res.status(201).json({
          message:"blog created success",
          createdBlog:{
              articleTitle:result.articleTitle,
             articleName:result.articleName,
             blogImage:result.blogImage,
            _id:result._id,
            request:{
                type:'GET',
                url:'https/blog/' + result._id
            }
          }
      });
      })
      .catch(err => {
          console.log(err);
          res.status(500).json({error: err});
      })
     
  
      });
 

 router.get('/:blogId',(req,res,next) => {
      
    const id=req.params.blogId;
    Blog.findById(id)
    .select('_id articleTitle articleName blogImage')
    .exec()
    .then(doc => {
        console.log("form database",doc);
        if(doc){
        res.status(200).json(doc);
        }
        else{
           res.status(404).json({message:" no invalid id found"}); 
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    })
   
})

router.delete('/:blogId', (req,res,next) =>{
    const id=req.params.blogId;
    Blog.remove({_id:id})
    .exec()
    .then(result => {
        
        res.status(200).json({message:"blog deleted"});
    })
    .catch(error => {
    console.log(error);
    res.status(500).json({
        error:error
    })
    })
  
});
  

export default router