
import express from 'express'
const router = express.Router();
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/user'

router.post("/signup", (req,res,next) => {
    User.find({email:req.body.email})
    .exec()
    .then(user => {
        if(user.length >= 1){
          return  res.status(409).json({
                message:'email already exist'
            })
        }
        else{


            bcrypt.hash(req.body.password, 10 , (err,hash) =>{

                if(err){
                    return res.status(500).json({
                        error:err
                    })
                }
                else
                {
                
                 const user =new User({
                
                _id: new mongoose.Types.ObjectId(),
                email:req.body.email,
                password:hash
                    
                    });
                    user.save()
                    .then(result => {
                        console.log(result);
                        res.status(201).json({
                            
                            message:'signup success'
                        })
                    })
                    .catch(err =>{
                        console.log(err);
                        res.status(500).json({
                       
                       error:err
                            })
                    });
                }
                })
            




        }
    })
    
  
});

router.post('/login',(req,res,next) => {
User.find({email: req.body.email})


.exec()
.then(user =>{
    if(user.length < 1){
        return res.status(401).json({
            message:'user doesn\'t exist'
        });
    }
    bcrypt.compare(req.body.password, user[0].password, (err,result) => {
        if(err){
            res.status(401).json({
                message:'auth failed'
            });
        }
        if(result){
            const token = jwt.sign({
                email:user[0].email,
                userId:user[0]._id
            },
            process.env.JWT_KEY,
            {
            expiresIn:"1h"
            }
            );
          return res.status(200).json({
                message:'login success',
                token:token
            });
        }
        res.status(401).json({
            message:'auth failed',
            
        });
    })
})
.catch( err =>{
console.log(err);
res.status(500).json({
error:err
    })
})

} )
export default router
