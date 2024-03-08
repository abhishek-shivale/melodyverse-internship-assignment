import expres from "express";
import { upload } from "../utils/uploadAvatar.js";
import { SignupController } from "../controllers/userController.js";

const userRouter = expres.Router()


userRouter.route("/signup").post(upload.single("avater"), SignupController);



export default userRouter