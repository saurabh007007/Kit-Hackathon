// Login.tsx
import React, { useState } from "react";
import axios from "axios";
import { UserLogin } from "../../lib/zod"; // Import the UserLogin schema from the correct path
import { z } from "zod";
import { BACKEND_URL } from "../../lib/constant";
import { Link, useNavigate } from "react-router-dom";

// Define the form data and error types
interface FormData {
  email: string;
  password: string;
}

interface Errors {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Errors>({
    email: "",
    password: "",
  });

  //navigate
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({ email: "", password: "" });

    // Validate input using zod schema
    try {
      UserLogin.parse(formData);

      // Make the POST request to your API for login
      await axios.post(`${BACKEND_URL}/login`, formData, {
        withCredentials: true,
      });
      alert("Login successful");
      navigate("/chat"); // Redirect to the home page

      // Handle the response (like storing the token or redirecting to a dashboard)
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationErrors: Errors = {
          email: "",
          password: "",
        };
        error.errors.forEach((err) => {
          validationErrors[err.path[0] as keyof Errors] = err.message;
        });
        setErrors(validationErrors);
      } else {
        console.error(error);
        alert("user not exist");
        // alert("An error occurred during login.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 ">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">User Log In</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email:
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your Register email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">{errors.email}</span>
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700">
              Password:
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your registered Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.password && (
              <span className="text-red-500 text-sm">{errors.password}</span>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Log In
          </button>
        </form>
        <p className="py-1">
          Don't have account -
          <Link to="/signup">
            <span className="text-blue-600 px-2.5"> Signup</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
