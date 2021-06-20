const catchAsync = require("../utils/catchAsync");
const Review = require("../models/reviewsModel");

exports.createReview = catchAsync(async (req, res, next) => {
  req.body.user = req.user._id;
  const review = await Review.create(req.body);
  res.status(200).json({
    status: "success",
    review,
  });
});

exports.getAllReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.find();
  res.status(200).json({
    status: "success",
    reviews,
  });
});
