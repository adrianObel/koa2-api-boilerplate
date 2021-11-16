import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "../../config";
import jwt from "jsonwebtoken";
var User = new mongoose.Schema({
    type: { type: String, default: "User" },
    name: { type: String },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});
User.pre("save", function preSave(next) {
    var user = this;
    if (!user.isModified("password")) {
        return next();
    }
    new Promise(function (resolve, reject) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return reject(err);
            }
            resolve(salt);
        });
    })
        .then(function (salt) {
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) {
                throw new Error(err);
            }
            user.password = hash;
            next(null);
        });
    })
        .catch(function (err) { return next(err); });
});
User.methods.validatePassword = function validatePassword(password) {
    var user = this;
    return new Promise(function (resolve, reject) {
        bcrypt.compare(password, user.password, function (err, isMatch) {
            if (err) {
                return reject(err);
            }
            resolve(isMatch);
        });
    });
};
User.methods.generateToken = function generateToken() {
    var user = this;
    return jwt.sign({ id: user.id }, config.token);
};
export default mongoose.model("user", User);
