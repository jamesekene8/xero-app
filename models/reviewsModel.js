const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  description: {
    type: String,
    required: [true, "A review must have a decsription"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  estate: {
    type: mongoose.Schema.ObjectId,
    ref: "Realestate",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

reviewSchema.pre(/^find/, function (next) {
  this.populate("user").populate("estate");
  next();
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
