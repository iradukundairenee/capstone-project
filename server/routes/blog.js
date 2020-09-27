

import express from 'express'
const router = express.Router();
import mongoose from 'mongoose'
import multer from 'multer'
//import checkAuth from '../middleware/check-auth'

mongoose.connect('mongodb+srv://node-shop:' + process.env.MONGO_ATLAS_PW + '@node-shop.satrg.mongodb.net/node-shop?retryWrites=true&w=majority',


{useNewUrlParser: true , useUnifiedTopology:true, useCreateIndex: true}


);

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



module.exports = router;