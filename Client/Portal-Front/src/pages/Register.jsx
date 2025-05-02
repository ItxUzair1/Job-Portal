import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const schema = yup.object().shape({
  name: yup.string().required("Name is required").min(3, "Name must be at least 3 characters"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  role: yup.string().required("Please select a role"),
});

export default function Register() {
    const [serverError, setServerError] = useState(""); // state to hold server error message
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const onSubmit = (data) => {
    setServerError(""); // clear previous errors
    axios
      .post("http://localhost:3000/api/auth/register", data)
      .then((response) => {
        navigate("/login");
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.message) {
          setServerError(error.response.data.message); // custom error from backend
        } else {
          setServerError("Registration failed. Please try again.");
        }
      });
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-white to-blue-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg sm:max-w-md">
        <h1 className="text-3xl font-extrabold text-center text-blue-600 mb-6">Create an Account</h1>
        {serverError && <p className="text-red-500 text-sm text-center mb-4">{serverError}</p>}

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              {...register("name")}
              type="text"
              id="name"
              placeholder="John Doe"
              className={`mt-1 block w-full rounded-lg border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } shadow-sm focus:border-blue-500 focus:ring-blue-500`}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              {...register("email")}
              type="email"
              id="email"
              placeholder="example@email.com"
              className={`mt-1 block w-full rounded-lg border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } shadow-sm focus:border-blue-500 focus:ring-blue-500`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              {...register("password")}
              type="password"
              id="password"
              placeholder="••••••••"
              className={`mt-1 block w-full rounded-lg border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } shadow-sm focus:border-blue-500 focus:ring-blue-500`}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">
              Register As
            </label>
            <select
              {...register("role")}
              id="role"
              className={`mt-1 block w-full rounded-lg border ${
                errors.role ? "border-red-500" : "border-gray-300"
              } shadow-sm focus:border-blue-500 focus:ring-blue-500`}
            >
              <option value="">Select role</option>
              <option value="jobseeker">Job Seeker</option>
              <option value="recruiter">Recruiter</option>
            </select>
            {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-200"
          >
            Sign Up
          </button>

          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500 hover:underline">
              Log In
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
