import dotenv from "dotenv";

dotenv.config();

import cookieParser from "cookie-parser";
import express from "express";
import mongoose from "mongoose";

import AuthRoute from "./routes/auth.routes.js";
import UserRoute from "./routes/user.routes.js";

const app = express();
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO)
  .then(() => console.log("MONGOOSE CONNECTED"))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", AuthRoute);
app.use("/api/user", UserRoute);

app.use((err, req, res, next) => {
  const error = err.message;
  const success = false;
  const statusCode = err.code || 500;
  return res.status(statusCode).json({ error, success, statusCode });
});

app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
});
