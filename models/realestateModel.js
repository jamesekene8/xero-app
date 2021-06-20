const mongoose = require("mongoose");
const slugify = require("slugify");

const realestateSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "A real estate must have a title"],
    unique: true,
    maxLength: 21,
  },
  guests: {
    type: Number,
    required: [true, "You must specify the number of guests"],
    default: 1,
  },
  bedrooms: {
    type: Number,
    required: [true, "You must specify the number of bedrooms"],
    default: 1,
  },
  beds: {
    type: Number,
    required: [true, "You must specify the number of beds"],
    default: 1,
  },
  bathrooms: {
    type: Number,
    required: [true, "You must specify the number of bathrooms"],
    default: 1,
  },
  image: String,
  price: {
    type: Number,
    required: [true, "You must specify the price"],
    default: 10,
  },
  city: {
    type: String,
    required: [true, "You must specify the city"],
  },
  country: {
    type: String,
    default: "Nigeria",
  },
  realtor: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    default: "60ace9b9b85d5116e008b119",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  slug: String,
  imageCover: Array,
  balcony: String,
  garage: String,
  AirConditioning: {
    type: Boolean,
    default: false,
  },
  wifi: {
    type: Boolean,
    default: false,
  },
  pool: {
    type: Boolean,
    default: false,
  },
  phone: {
    type: Boolean,
    default: false,
  },
  parking: {
    type: Boolean,
    default: false,
  },
  tv: {
    type: Boolean,
    default: false,
  },
  homeTheatre: {
    type: Boolean,
    default: false,
  },
  alarm: {
    type: Boolean,
    default: false,
  },
  security: {
    type: Boolean,
    default: false,
  },
  gym: {
    type: Boolean,
    default: false,
  },
  electricRange: {
    type: Boolean,
    default: false,
  },
  privateSpace: {
    type: Boolean,
    default: false,
  },
  description: {
    type: String,
    required: [true, "An estate must have a description"],
    minLength: 50,
  },
});

realestateSchema.pre(/^find/, function (next) {
  this.populate({
    path: "realtor",
  });
  next();
});

realestateSchema.pre("save", function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

const Realestate = mongoose.model("Realestate", realestateSchema);

module.exports = Realestate;
