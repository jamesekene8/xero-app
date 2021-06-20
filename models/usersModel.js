const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "User must have a name"],
  },
  title: String,
  email: {
    type: String,
    required: [true, "User must have an email"],
    validate: [validator.isEmail, "Please provide a valid email address"],
    lowercase: true,
    unique: true,
  },
  role: {
    type: String,
    default: "lessee",
    enum: ["admin", "author", "realtor", "lessee"],
  },
  password: {
    type: String,
    required: [true, "User must have a password"],
    minlength: 8,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Password does not match",
    },
  },
  photo: {
    type: String,
    default: "avatar-13.jpg",
  },
  passwordResetToken: String,
  passwordResetExpires: Date,
  passwordChangedAt: Date,
  deleteAccountToken: String,
  deleteExpires: Date,
  phone: String,
  about: String,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

userSchema.methods.accountDeleteToken = function () {
  const deleteToken = crypto.randomBytes(32).toString("hex");

  this.deleteAccountToken = crypto
    .createHash("sha256")
    .update(deleteToken)
    .digest("hex");

  this.deleteExpires = Date.now() + 10 * 60 * 1000;

  return deleteToken;
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }

  // False means NOT changed
  return false;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
