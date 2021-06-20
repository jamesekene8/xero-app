const User = require("../models/usersModel");
const catchAsync = require("../utils/catchAsync");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/email");
const crypto = require("crypto");
const AppError = require("../utils/appError");
const multer = require("multer");
const sharp = require("sharp");
const fs = require("fs");

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(
      new AppError("This is not an image. Please, upload only images", 400),
      false
    );
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadUserPhoto = upload.single("photo");

exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();
  req.file.filename = `user-${req.user.id}-${Date.now()}.jpg`;
  await sharp(req.file.buffer)
    .resize(220, 220)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/assets/img/avatar/${req.file.filename}`);
  next();
});

exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError("You cannot update your password using this route.", 400)
    );
  }
  const filteredBody = filterObj(
    req.body,
    "name",
    "email",
    "title",
    "role",
    "about",
    "phone"
  );
  if (req.file) filteredBody.photo = req.file.filename;
  const updatedUser = await User.findByIdAndUpdate(req.user._id, filteredBody, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: "success",
    user: updatedUser,
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  const userDelete = await User.findById(req.params.id);
  const userImage = userDelete.photo;
  try {
    fs.unlinkSync(`public/assets/img/avatar/${userImage}`);
  } catch (err) {
    return new AppError(err, 400);
  }

  await User.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: "success",
  });
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    status: "success",
    users,
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  res.status(200).json({
    status: "success",
    user,
  });
});
