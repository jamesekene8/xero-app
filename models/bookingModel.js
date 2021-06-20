const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  estate: {
    type: mongoose.Schema.ObjectId,
    ref: "Realestate",
    required: [true, "Booking must belong to an estate"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Booking must belong to a user"],
  },
  price: {
    type: Number,
    required: [true, "Booking must have a price"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  paid: {
    type: Boolean,
    default: true,
  },
});

bookingSchema.pre(/^find/, function (next) {
  this.populate("user").populate({
    path: "estate",
    select: "title",
  });
  next();
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
