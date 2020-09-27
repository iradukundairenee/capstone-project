
import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'


const app=express();

import blogRoutes from './routes/blog'
 mongoose.connect('mongodb+srv://node-shop:' + process.env.MONGO_ATLAS_PW + '@node-shop.satrg.mongodb.net/node-shop?retryWrites=true&w=majority',


     {useNewUrlParser: true , useUnifiedTopology:true, useCreateIndex: true}


 );
  mongoose.Promise=global.Promise;

app.use(morgan('dev'));
app.use(express.static('uploads'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/blog', blogRoutes);
app.use((req,res,next) => {
    const error=new Error('not found');

    error.status=404;
    next(error);

});

app.use((error,req,res,next) => {
    res.status(error.status || 500);
    res.json({
        error:{
        message:error.message
    } })

});
module.exports = app;




 