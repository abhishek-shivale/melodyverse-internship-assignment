import axiosInstance from "../app/axiosInstance";

export const getAllPost = (page) => {
  const response = axiosInstance.get("/post/", {
    params: {
      page,
    },
  });
  return response;
};
