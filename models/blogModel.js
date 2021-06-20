const mongoose = require("mongoose");
const slugify = require("slugify");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "A title is required"],
    unique: true,
  },
  description: {
    type: String,
    required: [true, "A description is required"],
  },
  coverImage: {
    type: String,
    default: "image-cover.jpg",
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  slug: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

blogSchema.pre("save", function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

blogSchema.pre(/^find/, function (next) {
  this.populate({
    path: "author",
  });
  next();
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
