import express from "express";
import protectedRoute from "../middleware/protectedRoute.js";
import { createPost, getAllPost } from "../controllers/postController.js";


const postRouter = express.Router()

postRouter.route('/add').post(protectedRoute, createPost)
postRouter.route('/').get(protectedRoute,getAllPost)








export default postRouter