import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { UserType } from './types'
import config from "../config";

const User = new mongoose.Schema({
  type: { type: String, default: "User" },
  name: { type: String },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

User.pre("save", async function(this: UserType, next: any) {
  const user = this;

  if (!user.isModified("password")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(user.password, salt)
    user.password = hash;

    next();
  } catch(err: any) {
    next(err)
  }
});

User.methods.validatePassword = async function(this: UserType, password: string) {
  const user = this;
  await bcrypt.compare(password, user.password)
};

User.methods.generateToken = function(this: UserType) {
  const user = this;

  return jwt.sign({ id: user.id }, config.token);
};

export default mongoose.model("user", User);
