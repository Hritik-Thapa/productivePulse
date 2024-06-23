import dotenv from "dotenv";

dotenv.config();

import jwt from "jsonwebtoken";

const SecretKey = process.env.SECRET_KEY;

export const generateToken = (user) => {
  const payload = { _id: user._id };
  const token = jwt.sign(payload, SecretKey);
  return token;
};

export const validateToken = (token) => {
  const payload = jwt.verify(token);
  return payload;
};
