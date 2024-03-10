import asyncMiddleware from "../middleware/asyncMiddleware.js";
import postModel from "../models/postModel.js";
import userModel from "../models/userModel.js";
import { v4 as uuidv4 } from "uuid";

export const createPost = asyncMiddleware(async (req, res, next) => {
  const { title, description, banner, author } = req.body;
  const user = await userModel.findOne({id:req.id})
  if(!user){
      return res.status(404).json({
        success: false,
        message: "You dont permission to This resource",
      });
   }
  const newPost = await postModel.create({
    id: uuidv4(),
    title: title,
    description: description,
    banner: banner,
    author: author,
  });

  res.status(200).json({
    success: true,
    message: "You have created Post successfully",
    postId: newPost.id,
  });
});
const PAGE_LIMIT = 3;
export const getAllPost = asyncMiddleware(async (req, res) => {
  const { limit = PAGE_LIMIT, page } = req.query;
  const postSkip = (page - 1) * PAGE_LIMIT || 0;
  const post = await postModel.find().limit(limit).skip(postSkip);
  const totalPosts = await postModel.countDocuments();
  res.status(201).json({
    success: true,
    message: "All post",
    post: post,
    totalPosts,
  });
});
