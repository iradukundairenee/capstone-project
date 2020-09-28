

import express from 'express'
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
             blogTitle:doc.articleTitle,
             blogContent:doc.articleName,
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

export default router