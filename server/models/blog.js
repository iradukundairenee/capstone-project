
import mongoose from 'mongoose'
const blogSchema =new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
articleTitle:{type: String, required: true },
articleName:{type: String, required: true},
blogImage:{type: String, required: true}
});

module.exports=mongoose.model('Blog',blogSchema);