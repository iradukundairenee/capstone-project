import express from 'express'
import mongoose from 'mongoose'
import blogRoutes from './routes/blog'

mongoose.connect('mongodb+srv://node-shop:node-shop@node-shop.satrg.mongodb.net/node-shop?retryWrites=true&w=majority',


     {useNewUrlParser: true , useUnifiedTopology:true, useCreateIndex: true}


 );
  


const app = express()

app.use(express.json())

app.use('/blog', blogRoutes);

const port=3000

app.listen(port,()=>{
	console.log(`server running on port ${port}`)
})