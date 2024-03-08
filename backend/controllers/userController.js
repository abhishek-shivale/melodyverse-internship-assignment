import asyncMiddleware from "../middleware/asyncMiddleware.js";
import userModel from "../models/userModel.js";
import { v4 as uuidv4 } from "uuid";
import { HashPassword } from "../utils/Password.js";
import sendToken from "../utils/sendToken.js";
import { WelcomMail } from "../utils/SendMail.js";

export const SignupController = asyncMiddleware(async (req, res, next) => {
  const { email, password, name } = req.body;

  const avatar = req.file ? req.file.avatar : null;

  if (!email || !password) {
    return res.status(411).json({
      success: false,
      message: "credential are missing",
    });
  }

  const already = await userModel.findOne({email:email});
  
  if (already) {
    return res.status(411).json({
      success: false,
      message: "You already have an account",
    });
  }

  const HashedPassword = await HashPassword(password);

  const newUser = await userModel.create({
    id: uuidv4(),
    name: name,
    email: email,
    password: HashedPassword,
    avatar: avatar,
  });
  WelcomMail(
    email,
    "Welcome To MelodyVerse",
    "Welcome To MelodyVerse! thanks for signup"
  );
  sendToken(newUser.id, res, "Your Account has been created");
});
