import mongoose from 'mongoose'
import Blogs from '../models/blogSchema'


export default class blogsController{
	static async getall(req,res){
		try {
            const docs = await Blogs.find().select('blogId blogTitle blogContent blogImage views comments').exec()
            res.status(200).json({ msg: docs })
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
	}
}