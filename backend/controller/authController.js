import User from "../model/userModel.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import { gentoken, gentoken1 } from "../config/token.js";
// import { response } from "express";
export const registration = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({
        message: "User already exist",
      });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        message: "Enter Valid Email",
      });
    }
    if (password.length < 8) {
      return res.status(400).json({
        message: "Password must be at least 8 characters",
      });
    }
    let hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    let token = await gentoken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
      message: "User Created Successfully",
      user,
    });
  } catch (error) {
    console.log("register error", error);
    return res.status(500).json({
      message: `Register Error ${error.message}`,
    });
  }
};

export const login = async (req, res) => {
  try {
    let { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User Not Found",
      });
    }
    let isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Incorrect Password",
      });
    }
    let token = await gentoken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
      message: "Login Successfully",
      user,
    });
  } catch (error) {
    console.log("login error", error);
    return res.status(500).json({
      message: `login Error ${error.message}`,
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({
      message: "Logout Successfully",
    });
  } catch (error) {
    console.log("logout error", error);
    return res.status(500).json({
      message: `logout Error ${error.message}`,
    });
  }
};

export const googleLogin = async (req, res) => {
  try {
    let { name, email } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ name, email });
    }
    let token = await gentoken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
      message: "Login Successfully",
      user,
    });
  } catch (error) {
    console.log("google login error", error);
    return res.status(500).json({
      message: `google login Error ${error.message}`,
    });
  }
};

export const adminLogin = async (req, res) => {
  try {
    let { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      let token = await gentoken1(email);
      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      return res.status(200).json({
        message: "Login Successfully",
        token,
      });
    }
    return res.status(400).json({
      message: "Invalid Credentials",
    });
  } catch (error) {
    console.log("Admin login error", error);
    return res.status(500).json({
      message: `Admin login Error ${error.message}`,
    });
  }
};
