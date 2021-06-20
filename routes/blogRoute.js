const express = require("express");
const blogController = require("../controllers/blogController");
const authController = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(blogController.getAllPosts)
  .post(
    authController.protect,
    authController.restrictTo("admin", "author"),
    blogController.uploadBlogPhoto,
    blogController.resizeBlogPhoto,
    blogController.createPost
  );

router
  .route("/:id")
  .get(blogController.getPost)
  .delete(
    authController.protect,
    authController.restrictTo("admin", "author"),
    blogController.deletePost
  )
  .patch(
    authController.protect,
    authController.restrictTo("admin", "author"),
    blogController.updatePost
  );

module.exports = router;
