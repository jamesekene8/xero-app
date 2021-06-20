const catchAsync = require("../utils/catchAsync");
const Blog = require("../models/blogModel");
const APIFeatures = require("../utils/apiFeatures");
const multer = require("multer");
const sharp = require("sharp");

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

exports.uploadBlogPhoto = upload.single("coverImage");

exports.resizeBlogPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();
  req.file.filename = `blog-${req.user.id}-${Date.now()}.jpeg`;
  await sharp(req.file.buffer)
    .resize(750, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/assets/img/blog/${req.file.filename}`);
  next();
});

exports.getAllPosts = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Blog.find(), req.query)
    .filter()
    .sort()
    .limitFields();
  const posts = await features.query;
  res.status(200).json({
    status: "success",
    length: posts.length,
    posts,
  });
});

exports.createPost = catchAsync(async (req, res, next) => {
  req.body.coverImage = req.file.filename;
  req.body.author = req.user._id;
  const post = await Blog.create(req.body);
  res.status(200).json({
    status: "success",
    post,
  });
});

exports.deletePost = catchAsync(async (req, res, next) => {
  const post = await Blog.findById(req.params.id);
  try {
    fs.unlinkSync(`public/assets/img/blog/${post.coverImage}`);
  } catch (err) {
    return new AppError(err, 400);
  }
  await Blog.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: "success",
  });
});

exports.getPost = catchAsync(async (req, res, next) => {
  const post = await Blog.findById(req.params.id);
  res.status(200).json({
    status: "success",
    post,
  });
});

exports.updatePost = catchAsync(async (req, res, next) => {
  const post = await Blog.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: "success",
    post,
  });
});
