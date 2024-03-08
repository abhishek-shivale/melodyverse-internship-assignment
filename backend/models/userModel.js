import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  id: String,
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
});

const userModel = mongoose.model("User", userSchema);

export default userModel;
