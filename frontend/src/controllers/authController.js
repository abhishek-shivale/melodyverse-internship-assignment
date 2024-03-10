import axiosInstance from "../app/axiosInstance";
export const RegisterFunction = (formData , photo) => {
  console.log(photo);
  const response = axiosInstance.post("/signup?file", {
    email: formData.email,
    name: formData.name,
    password: formData.password,
    avatar: photo,
  });

  return response;
};
