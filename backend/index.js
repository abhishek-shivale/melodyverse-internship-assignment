import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import userRouter from "./routes/userRoutes.js";
import postRouter from "./routes/postRoutes.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use(morgan("dev"));


app.use('/api/v1',userRouter)

app.use("/api/v1/post", postRouter);

app.use((err,req,res,next)=>{

  console.log("This is error from error function"+ err)
  
   res.status(500).json({
     success: false,
     message: "Something went wrong!",
   });
})
export default app;
