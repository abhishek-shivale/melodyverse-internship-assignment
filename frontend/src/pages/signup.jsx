import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react"; // Import useState
import { RegisterFunction } from "../controllers/authController";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [avatar, setavatar] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const handlePhoto = (e) => {
    setavatar(e.target.files[0]);
  };

  const onSubmit = async (formData) => {
    try {
      const data = await RegisterFunction(formData, avatar);
      if (data.data.success === true) {
        window.localStorage.setItem("token", data.data.token);
        toast.success(data?.data.message);
        setTimeout(() => {
          return navigate("/");
        }, 1000);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        console.log(error);
        toast.error("Network error. Please try again later.");
      }
    }
  };

  return (
    <>
      <Toaster position="bottom-right" />
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Register your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
            method="POST"
            encType="multipart/form-data">
            <div className="mt-2">
              <input
                {...register("name", { required: true })}
                type="text"
                placeholder="Your Name"
                className="block p-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.name && (
                <span className="text-red-500">Name is required</span>
              )}

              <input
                {...register("email", {
                  required: true,
                  pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                })}
                type="email"
                autoComplete="email"
                placeholder="Email address"
                className="block w-full p-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.email && (
                <span className="text-red-500">
                  Please enter a valid email address
                </span>
              )}

              <input
                {...register("password", {
                  required: true,
                  minLength: 8,
                })}
                type={showPassword ? "text" : "password"} 
                placeholder="Password"
                autoComplete="current-password"
                className="block p-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <input
                type="checkbox"
                onChange={() => setShowPassword(!showPassword)} 
                id="showPasswordToggle"
                className="mt-2"
              />
              <label htmlFor="showPasswordToggle" className="ml-2">
                Show password
              </label>
              {errors.password && (
                <span className="text-red-500">
                  Password must be at least 8 characters long
                </span>
              )}

              <input
                {...register("avatar")}
                type="file"
                accept=".png, .jpg, .jpeg"
                name="file"
                className="block p-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={handlePhoto}
              />
              {errors.banner && (
                <span className="text-red-500">
                  image must contain any of this format (.png, .jpg, .jpeg)
                </span>
              )}

              <div className="flex gap-2 items-center">
                <input
                  {...register("terms", {
                    required: true,
                  })}
                  type="checkbox"
                  name="terms"
                  className="text-black"
                />
                <label
                  htmlFor="terms"
                  className="cursor-pointer text-green-600">
                  Terms and Condition
                </label>
              </div>
              {errors.terms && (
                <span className="text-red-500">
                  You must Agree to terms and condition
                </span>
              )}
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Register
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Login Here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
