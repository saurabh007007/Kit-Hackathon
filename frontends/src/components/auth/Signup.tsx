import React, { useState } from "react";
import axios from "axios";
import { UserRegister } from "../../lib/zod"; // Make sure this import matches the correct path for your zod validation schema
import { z } from "zod";
import { BACKEND_URL } from "../../lib/constant";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
// Define the form data and error types
interface FormData {
  name: string;
  email: string;
  password: string;
}

interface Errors {
  name: string;
  email: string;
  password: string;
}

const Signup: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Errors>({
    name: "",
    email: "",
    password: "",
  });
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
    setErrors({ name: "", email: "", password: "" });

    // Validate input using zod schema
    try {
      UserRegister.parse(formData);

      // Make the POST request to your API
      const response = await axios.post(`${BACKEND_URL}/register`, formData, {
        withCredentials: true,
      });
      alert("User registered successfully");
      navigate("/login"); // Redirect to the login page
      console.log(response.data);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationErrors: Errors = {
          name: "",
          email: "",
          password: "",
        };
        error.errors.forEach((err) => {
          validationErrors[err.path[0] as keyof Errors] = err.message;
        });
        setErrors(validationErrors);
      } else {
        console.error(error);
        alert("User name exist.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">User Signup</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.name && (
              <span className="text-red-500 text-sm">{errors.name}</span>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email:
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email address"
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
              name="password"
              placeholder="Enter Password"
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
            Register
          </button>
        </form>
        <p className="py-3">
          Already have account -
          <Link to="/login">
            <span className="text-blue-600 px-2.5"> Login</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
