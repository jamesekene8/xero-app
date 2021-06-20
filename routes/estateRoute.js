const express = require("express");
const estateController = require("../controllers/estateController");
const authController = require("../controllers/authController");
const blogController = require("../controllers/blogController");

const router = express.Router();

router
  .route("/")
  .get(estateController.getAllEstates)
  .post(
    authController.protect,
    authController.restrictTo("admin", "realtor"),
    estateController.uploadEstateImages,
    estateController.resizeEstateImages,
    estateController.createEstate
  );

router.route("/search").get(estateController.getSearchedProperty);

router
  .route("/:id")
  .get(estateController.getEstate)
  .patch(
    authController.protect,
    authController.restrictTo("admin", "realtor"),
    estateController.updateEstate
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin", "realtor"),
    estateController.deleteEstate
  );

// router
//   .route("/blog")
//   .get(blogController.getAllPosts)
//   .post(blogController.createPost);

router.route("/searchQuery").post(estateController.searchQuery);

module.exports = router;
