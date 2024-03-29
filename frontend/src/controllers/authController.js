import axiosInstance from "../app/axiosInstance";
export const RegisterFunction = (formData , photo) => {
  const response = axiosInstance.post("/signup", {
    email: formData.email,
    name: formData.name,
    password: formData.password,
    avatar: photo,
  });

  return response;
};
