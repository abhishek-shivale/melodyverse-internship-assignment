import { VerfiyToken } from "../utils/sendToken.js";

const protectedRoute = async(req,res,next) => {
    try{
        const token = req.headers.authorization;
        if (!token) {
        return res.status(404).json({
            success:false,
            message: "You dont Have access to This resource"
        });
        }
        const verifyTokens = VerfiyToken(token);
        if(!verifyTokens){
            return res.status(404).json({
            success: false,
            message: "You dont Have access to This resource",
            });
        }
        req.id = verifyTokens.id;
        next();
    }catch(err){
        console.log('authorisation got an error'+ err)
        return res.status(411).json({
            success: false,
            message: "You Got an error",
        });
    }
}

export default protectedRoute