import jwt from "jsonwebtoken";


const sendToken = async(id, res, msg) => {
  try {
    const token =  jwt.sign(id, process.env.JWTPASS);

   return res.status(200).json({
      success: true,
      message: msg,
      token: token,
    });
  } catch (error) {
    console.log("Send Token Got an Error" + error);

    res.status(500).json({
      success: true,
      message: "Internal Server Error",
    });
  }
};

export default sendToken;
