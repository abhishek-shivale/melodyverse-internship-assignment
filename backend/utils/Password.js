import { hash } from "bcrypt";

const SALTROUND = process.env.SALTROUND || 10;

export const HashPassword = (pass) => {
  try {
    const hashed = hash(pass, SALTROUND);
    return hashed;
  } catch (error) {
    console.log("Hashed Password Got an Error" + error);

    res.status(500).json({
      success: true,
      message: "Internal Server Error",
    });
  }
};
