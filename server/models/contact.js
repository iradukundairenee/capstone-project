import mongoose,{schema} from 'mongoose'
const contactSchema= new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    email:{ type: String , required: true },
    message:{ type: String , required: true}
})

module.exports= mongoose.model('Contact',contactSchema)