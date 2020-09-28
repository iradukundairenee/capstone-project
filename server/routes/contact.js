import express from 'express'
import mongoose from 'mongoose'



mongoose.connect('mongodb+srv://node-shop:node-shop@node-shop.satrg.mongodb.net/node-shop?retryWrites=true&w=majority',


     {useNewUrlParser: true , useUnifiedTopology:true, useCreateIndex: true}


 );

import Contact from '../models/contact' 

const router = express.Router();

router.get('/', (req,res,next) => {
   Contact.find()
   .select('_id email message')
   .exec()
   .then(docs => {
       
       const response = {
           count:docs.length,
           contact:docs.map(doc =>{

    return {
             email:doc.email,
             message:doc.message,
            _id:doc._id,
             request:{
                type:'GET',
                 url:'https/contact/' + doc._id
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

router.post('/',(req,res,next) =>{

  console.log(req.file);
    const contact = new Contact({
     _id: new mongoose.Types.ObjectId(),
     email:req.body.email,
     message:req.body.message,

    });
    contact
    .save()
    .then(result => {
        console.log(result);
         res.status(201).json({
        message:"contact created ",
        createdContact:{
            email:result.email,
           message:result.message,
          _id:result._id,
          request:{
              type:'GET',
              url:'https/contact/' + result._id
          }


        }
    });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    })
   

    });

    router.get('/:contactId',(req,res,next) => {

        const id=req.params.contactId;
        Contact.findById(id)
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
    


router.patch('/:contactId', (req,res,next) =>{
    const id=req.params.blogId;
    const updateOps = {};
    for ( const ops of req.body){

        updateOps[ops.propName]=ops.value;
    }
    
    Contact.update({_id: id},{$set : updateOps})
    .exec()
    .then(result => {
  console.log(result);
  res.status(200).json(result);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error:err
        })

    })
        });
    
        router.delete('/:contactId', (req,res,next) =>{
            const id=req.params.contactId;
            Contact.remove({_id:id})
            .exec()
            .then(result => {
                
                res.status(200).json(result);
            })
            .catch(error => {
            console.log(error);
            res.status(500).json({
                error:error
            })
            })
          
});

export default router


