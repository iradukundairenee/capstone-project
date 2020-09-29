import mongoose from 'mongoose'

const profileSchema=mongoose.Schema({

_id:mongoose.Schema.Types.ObjectId,
profileName:{type: String, required: true},
description:{type:String, required: true},
profileImage:{type: String, required: true}
});
 
module.exports=mongoose.model('Profile',profileSchema);