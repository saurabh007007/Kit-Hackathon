import React, { useState } from "react";
import axios from "axios";
import { UserFeedback } from "../../lib/zod";
import { z } from "zod";
import { BACKEND_URL } from "../../lib/constant";
import { useNavigate } from "react-router-dom";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Navbar } from "../Home/HeroSection";

interface FormData {
  name: string;
  email: string;
  feedback: string;
  rating: number;
}

interface Errors {
  name: string;
  email: string;
  feedback: string;
  rating: string;
}

const FeedbackForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    feedback: "",
    rating: 1,
  });

  const [errors, setErrors] = useState<Errors>({
    name: "",
    email: "",
    feedback: "",
    rating: "",
  });

  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "rating" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({ name: "", email: "", feedback: "", rating: "" });

    try {
      UserFeedback.parse(formData);
      await axios.post(`${BACKEND_URL}/feedback`, formData, {
        withCredentials: true,
      });
      alert("Feedback submitted successfully");
      navigate("/thank-you");
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationErrors: Errors = {
          name: "",
          email: "",
          feedback: "",
          rating: "",
        };
        error.errors.forEach((err) => {
          validationErrors[err.path[0] as keyof Errors] = err.message;
        });
        setErrors(validationErrors);
      } else {
        console.error(error);
        alert("An error occurred while submitting feedback.");
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-semibold text-center mb-6">
            User Feedback
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
              />
              {errors.name && (
                <span className="text-red-500 text-sm">{errors.name}</span>
              )}
            </div>

            <div className="mb-4">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
              {errors.email && (
                <span className="text-red-500 text-sm">{errors.email}</span>
              )}
            </div>

            <div className="mb-4">
              <Label htmlFor="feedback">Feedback</Label>
              <Textarea
                id="feedback"
                name="feedback"
                value={formData.feedback}
                onChange={handleChange}
                placeholder="Write your feedback..."
              />
              {errors.feedback && (
                <span className="text-red-500 text-sm">{errors.feedback}</span>
              )}
            </div>

            <div className="mb-6">
              <Label htmlFor="rating">Rating</Label>
              <Input
                id="rating"
                type="number"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                min={1}
                max={5}
              />
              {errors.rating && (
                <span className="text-red-500 text-sm">{errors.rating}</span>
              )}
            </div>

            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default FeedbackForm;
