
import express from 'express'
const router = express.Router();
import mongoose from 'mongoose'
import multer from 'multer'

const storage =multer.diskStorage({

    destination:function(req,file,cb){
        cb(null, './uploads/');
    },
    filename:function(req,file,cb){
 cb(null, file.originalname);
    },

});

const upload=multer({storage:storage});

import Profile from '../models/profile'
router.post('/', upload.single('profileImage') ,(req,res,next) =>{

  console.log(req.file);
    const profile = new Profile({
     _id: new mongoose.Types.ObjectId(),
     profileName:req.body.profileName,
     description:req.body.description,
     profileImage:req.file.path
    });
    profile
    .save()
    .then(result => {
        console.log(result);
         res.status(201).json({
        message:"profile created success",
        createdProfile:{
            profileName:result.profileName,
           description:result.description,
          _id:result._id,
          request:{
              type:'GET',
              url:'https/profile/' + result._id
          }


        }
    });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    })
   

    });

    router.get('/:profileId',(req,res,next) => {
      
        const id=req.params.profileId;
        Profile.findById(id)
        .select('_id profileName description profileImage')
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
    


router.patch('/:profileId', (req,res,next) =>{
    const id=req.params.profileId;
    const updateOps = {};
    for ( const ops of Object.entries(req.body)){

        updateOps[ops[0]]=ops[1];
    }
    
    Profile.update({_id: id},{$set : updateOps})
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
    
        router.delete('/:profileId', (req,res,next) =>{
            const id=req.params.profileId;
             Profile.remove({_id:id})
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