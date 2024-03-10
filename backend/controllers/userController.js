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

  const already = await userModel.findOne({ email: email });

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
    `Welcome To MelodyVerse! thanks for signup
    verify You account here https://localhost:5173/verify/mail?id=${newUser.id}
    `
  );
  sendToken(newUser.id, res, "Your Account has been created");
});


export const resetPassword = asyncMiddleware(async(req,res,next)=>{
      const {password} = req.body

      const user = await userModel.findOne({ id: req.id });

      if (password !== undefined && password !== null && password !== "") {
        const hashpassword = await HashPassword(password);

        user.password = hashpassword;
      }

      await user.save();

      WelcomMail(
        user.email,
        "your Password has been Updated",
        "your Password has been Updated for mor info check on website"
      );
        res.status(200).json({
          success: true,
          message: "You Password has beeen changed"
        })
})

export const verifymail = asyncMiddleware(async(req,res,next)=>{
  const userId = req.query.id
  const user = await userModel.findOne({id:userId})
  if(!user){
    return res.status(411).json({
      success:false,
      message:"Your account not found"
    })
  }

   const verify = await user.updateOne({
    verifed:true
  });
  if(!verify){
    return res.status(411).json({
      success: false,
      message: "Your account not verified please try again",
    });
  }
   return res.status(200).json({
     success: false,
     message: "Your account has verified",
   });
}) 