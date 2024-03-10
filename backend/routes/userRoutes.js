import express from "express";
import { SignupController } from "../controllers/userController.js";
import multer from "multer";

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

export default userRouter;
