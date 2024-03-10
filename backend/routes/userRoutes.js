import express from "express";
import { SignupController, resetPassword, verifymail } from "../controllers/userController.js";
import multer from "multer";
import protectedRoute from "../middleware/protectedRoute.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}+ ${file.originalname}`);
  },
});

let upload = multer({ storage });

const userRouter = express.Router();

userRouter.route("/signup").post(upload.single("avatar"), SignupController);

userRouter.route("/update/password").put(protectedRoute,resetPassword);

userRouter.route("/verify/account").put(verifymail);


export default userRouter;
