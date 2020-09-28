
import mongoose,{schema} from 'mongoose'
const blogSchema= new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    blogTitle:{type:String,required:true},
    blogContent:{type:String,required:true},
    blogImage:{type:String,required:true}
})

module.exports= mongoose.model('Blog',blogSchema)