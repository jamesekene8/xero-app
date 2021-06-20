const catchAsync = require("../utils/catchAsync");
const Realestate = require("../models/realestateModel");
const User = require("../models/usersModel");
const Blog = require("../models/blogModel");
const APIFeatures = require("../utils/apiFeatures");
const router = require("../routes/viewsRoute");
const AppError = require("../utils/appError");
const Booking = require("../models/bookingModel");
const Review = require("../models/reviewsModel");

exports.getOverview = catchAsync(async (req, res, next) => {
  const estates = await Realestate.find();
  const users = await User.find({ role: "realtor" }).limit(4);
  const features = new APIFeatures(Realestate.find(), req.query)
    .filter()
    .sort()
    .limitFields();
  const recentProperties = await features.query.limit(3);

  res.status(200).render("overview", {
    title_bar: "Home",
    title: "Xeros",
    estates,
    users,
    recentProperties,
  });
});

exports.login = catchAsync(async (req, res, next) => {
  res.status(200).render("login", {
    title_bar: "Login",
    title: "Login Page",
  });
});

exports.getBlog = catchAsync(async (req, res, next) => {
  const post = await Blog.findOne({ slug: req.params.slug });
  const features = new APIFeatures(Realestate.find(), req.query)
    .filter()
    .sort()
    .limitFields();
  const recentProperties = await features.query.limit(3);
  res
    .status(200)
    .set(
      "Content-Security-Policy",
      "connect-src 'self' https://cdnjs.cloudflare.com"
    )
    .render("blog", {
      title: "Blog Post",
      title_bar: "Blog",
      post,
      recentProperties,
    });
});

exports.getEstateDetail = catchAsync(async (req, res, next) => {
  const estate = await Realestate.findOne({ slug: req.params.slug });
  const relatedProperties = await Realestate.find({
    location: estate.location,
  }).limit(2);
  const bookings = await Booking.find({ estate: estate._id });
  const reviews = await Review.find({ estate: estate._id });
  res.status(200).render("estate", {
    title_bar: "Estate",
    title: "Estate Details",
    estate,
    relatedProperties,
    bookings,
    reviews,
  });
});

exports.getAllEstates = catchAsync(async (req, res, next) => {
  if (!req.query.limit || !req.query.page) {
    req.query.limit = 5;
    req.query.page = 1;
  }
  const features = new APIFeatures(Realestate.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const estates = await features.query;
  const count = await Realestate.countDocuments();

  res.status(200).render("properties", {
    title_bar: "Estates",
    title: "List of avalaible properties",
    estates,
    totalPages: Math.ceil(count / req.query.limit),
    page: req.query.page,
  });
});

exports.getAllAgents = catchAsync(async (req, res, next) => {
  const agents = await User.find({ role: "realtor" });
  res.status(200).render("agents", {
    title_bar: "Agents",
    title: "Meet Our Realtors",
    agents,
  });
});

exports.getAllPosts = catchAsync(async (req, res, next) => {
  const posts = await Blog.find();
  res.status(200).render("blog_list", {
    title_bar: "Posts",
    title: "Blog Posts",
    posts,
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const properties = await Realestate.find({ realtor: req.user._id });
  const user = await User.findById(req.user._id);
  const users = await User.find();
  const estates = await Realestate.find();
  const blogs = await Blog.find();
  const authorBlogs = await Blog.find({ author: req.user._id });
  const bookings = await Booking.find({ user: req.user._id });
  const estateIDs = bookings.map((el) => el.estate._id);
  const lesseeEstates = await Realestate.find({ _id: { $in: estateIDs } });

  res.status(200).render("user_profile", {
    title_bar: "Profile",
    user,
    properties,
    users,
    estates,
    blogs,
    authorBlogs,
    lesseeEstates,
    bookings,
  });
});

exports.contact = catchAsync(async (req, res, next) => {
  res.status(200).render("contact", {
    title_bar: "Contact-Us",
    title: "Contact Us",
  });
});

exports.forgotPasswordPage = catchAsync(async (req, res, next) => {
  res.status(200).render("forgot_password");
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  res.status(200).render("resetPassword");
});

exports.createPostPage = catchAsync(async (req, res, next) => {
  res.status(200).render("createPost");
});

exports.register = catchAsync(async (req, res, next) => {
  res.status(200).render("register");
});

exports.changePassword = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  res.status(200).render("change_password", {
    user,
  });
});

exports.submitProperty = catchAsync(async (req, res, next) => {
  if (req.user.role === "author") {
    return next(new AppError("You are not allowed to access this route", 401));
  }
  res.status(200).render("submit_property", {
    title_bar: "Create-Property",
  });
});

exports.getSearchedResults = catchAsync(async (req, res, next) => {
  res.status(200).render("search");
});
