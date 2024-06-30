import User from "../models/user.models.js";
import { createHmac, randomBytes } from "crypto";

export const googleAuthenticator = async (req, res, next) => {
  console.log(req.body);
  const { email, username } = req.body;
  const user = await User.findOne({ email });
  console.log(`1user${user}`);

  if (!user) {
    console.log("google auth");
    const password = randomBytes(8).toString();
    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac("sha256", salt)
      .update(password)
      .digest("hex");
    const newUser = await User.create({
      email,
      password: hashedPassword,
      salt,
      username,
    });
    req.user = newUser;
  } else {
    req.user = user;
  }
  return next();
};
