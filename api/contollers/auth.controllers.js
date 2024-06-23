import Stats from "../models/stats.model.js";
import TodoList from "../models/todos.model.js";
import User from "../models/user.models.js";
import mongoose from "mongoose";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  console.log(req.body);

  if (!username || !email || !password) {
    const error = new Error("Enter the complete credentials");
    next(error);
  }
  try {
    const user = await User.create({
      username,
      email,
      password,
    });
    const todoList = await TodoList.create({});
    const stats = await Stats.create({});
    return res.status(200).json({ success: "success" });
  } catch (err) {
    if (err.code === 11000) {
      const error = new Error();
      error.message = "Email already exists";
      return next(error);
    }
    return next(err);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(email, password);
  if (!email || !password) {
    const error = new Error("Enter the complete credentials");
    next(error);
  }
  try {
    const data = await User.userAuthForToken(email, password);
    console.log(data);
    res.status(200).cookie("authToken", data.token).json(data.user);
  } catch (err) {
    return next(err);
  }
};
