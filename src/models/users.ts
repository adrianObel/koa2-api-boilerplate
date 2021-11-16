import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "../config";
import jwt from "jsonwebtoken";
import { UserType } from './types'

const User = new mongoose.Schema({
  type: { type: String, default: "User" },
  name: { type: String },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

User.pre("save", function(this: UserType, next: any) {
  const user = this;

  if (!user.isModified("password")) {
    return next();
  }

  new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return reject(err);
      }
      resolve(salt);
    });
  })
    .then((salt) => {
      bcrypt.hash(user.password, salt, (err: any, hash: string) => {
        if (err) {
          throw new Error(err);
        }

        user.password = hash;

        next();
      });
    })
    .catch((err) => next(err));
});

User.methods.validatePassword = (password: string) => {
  const user = this;

  return new Promise((resolve, reject) => {
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        return reject(err);
      }

      resolve(isMatch);
    });
  });
};

User.methods.generateToken = function generateToken() {
  const user = this;

  return jwt.sign({ id: user.id }, config.token);
};

export default mongoose.model("user", User);
