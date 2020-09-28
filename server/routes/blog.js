

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



import Blog from '../models/blog'
//import blogController from'../controllers/blogController'
const router = express.Router()
//router.get('/',blogController.getall)
router.get('/', (req,res,next) => {
    Blog.find()
    .select('_id blogTitle blogContent blogImage')
    .exec()
    .then(docs => {
        
        const response = {
            count:docs.length,
            blogs:docs.map(doc =>{
 
     return {
             blogTitle:doc. blogTitle,
             blogContent:doc.blogContent,
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
 

 router.get('/:blogId',(req,res,next) => {
      
    const id=req.params.blogId;
    Blog.findById(id)
    .select('_id blogTitle blogContent blogImage')
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
  

export default router