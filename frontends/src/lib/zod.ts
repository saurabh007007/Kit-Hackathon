import z from "zod";
export const UserRegister = z.object({
  name: z
    .string()
    .min(3, "Minimum Three Character is required")
    .max(50, "Maximum Fifty Character is required"),

  //Email Validation
  email: z.string().email("Invalid Email Address"),
  //Password Validation
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(128, "Password must be less than 128 characters long")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[\W_]/,
      "Password must contain at least one special character (e.g., @, #, $, etc.)"
    ),
});
export const UserLogin = z.object({
  email: z.string().email("Invalid Email Address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(128, "Password must be less than 128 characters long")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[\W_]/,
      "Password must contain at least one special character (e.g., @, #, $, etc.)"
    ),
});

export const UserFeedback = z.object({
  name: z
    .string()
    .min(3, "Minimum Three Character is required")
    .max(50, "Maximum Fifty Character is required"),

  //Email Validation
  email: z.string().email("Invalid Email Address"),
  //Feedback Validation
  feedback: z
    .string()
    .min(10, "Feedback must be at least 10 characters long")
    .max(500, "Feedback must be less than 500 characters long"),
  //Rating Validation
  rating: z.number().min(1).max(5),
});
