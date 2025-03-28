import { prisma } from "../lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
dotenv.config();
import { UserRegister, UserLogin } from "../lib/zod";

export const registerUser = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { name, email, password } = UserRegister.parse(req.body);

    let user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      return res.status(400).json({
        message: "User already exists",
        success: false,
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword,
      },
    });
    //token basics
    const tokenData = {
      userId: newUser.id,
    };
    if (!process.env.JWT_SECRET) {
      return res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }

    const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    user = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      password: newUser.password,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 60 * 60 * 24 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        message: "User Registered Successfully",
        success: true,
        newUser,
        token,
      });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ e });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = UserLogin.parse(req.body);

    let user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid Credentials",
        success: false,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Credentials",
        success: false,
      });
    }

    const tokenData = {
      userId: user.id,
    };

    if (!process.env.JWT_SECRET) {
      return res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }

    const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    user = {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 60 * 60 * 24 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        message: "User Logged in Successfully",
        success: true,
        user,
        token,
      });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ e });
  }
};

export const logout = async (req: Request, res: Response): Promise<any> => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const verifyToken = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.body.userId,
      },
    });
    if (!user) {
      return res.status(400).json({
        message: "Invalid Token",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Valid Token",
      success: true,
      user,
    });
  } catch (e) {
    console.log(e);
  }
};

export const Feedback = async (req: Request, res: Response): Promise<any> => {
  try {
    const { name, email, feedback, rating } = req.body;

    const feedbackData = await prisma.feedback.create({
      data: {
        name,
        email,
        feedback,
        rating,
      },
    });

    return res.status(200).json({
      message: "Feedback submitted successfully",
      success: true,
      feedbackData,
    });
  } catch (e) {
    console.log(e);
    alert(e);
  }
};
