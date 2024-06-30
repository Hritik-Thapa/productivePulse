import mongoose, { model, Schema } from "mongoose";
import { createHmac, randomBytes } from "crypto";
import { generateToken } from "../utils/token.js";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
  },
  customModes: [
    {
      work: {
        type: Number,
      },
      rest: {
        type: Number,
      },
    },
  ],
});

userSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) {
    return;
  }
  const salt = randomBytes(16).toString();
  const hashedPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");

  user.password = hashedPassword;
  user.salt = salt;
  next();
});

userSchema.static("userAuthForToken", async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) throw new Error("Invalid Email Address");
  const dbPassword = user.password;
  const salt = user.salt;
  const hashedPassword = createHmac("sha256", salt)
    .update(password)
    .digest("hex");
  if (dbPassword !== hashedPassword) throw new Error("Invalid Password");
  const token = generateToken(user);
  return {
    token,
    user: { ...user._doc, password: undefined, salt: undefined },
  };
});

userSchema.static("authenticateFromGoogle", async function (email) {
  const user = await this.findOne({ email });
  const token = generateToken(user);
  return {
    token,
    user: { ...user._doc, password: undefined, salt: undefined },
  };
});

const User = model("user", userSchema);
export default User;
