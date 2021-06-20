const express = require("express");
const viewsController = require("../controllers/viewsController");
const estateController = require("../controllers/estateController");
const authController = require("../controllers/authController");
const bookingController = require("../controllers/bookingController");

const router = express.Router();

router.get("/", authController.isLoggedIn, viewsController.getOverview);

router.get("/login", viewsController.login);

router.get("/register", viewsController.register);

router.get(
  "/change-password",
  authController.protect,
  viewsController.changePassword
);

router.get("/user", authController.protect, viewsController.getUser);

router.get("/contact-us", authController.isLoggedIn, viewsController.contact);

router
  .route("/estate/:slug")
  .get(authController.isLoggedIn, viewsController.getEstateDetail);

router
  .route("/agents")
  .get(authController.isLoggedIn, viewsController.getAllAgents);

router
  .route("/estates")
  .get(
    authController.isLoggedIn,
    bookingController.createBookingCheckout,
    viewsController.getAllEstates
  );

router
  .route("/blogs")
  .get(authController.isLoggedIn, viewsController.getAllPosts);

router
  .route("/blog/:slug")
  .get(authController.isLoggedIn, viewsController.getBlog);

router.post("/search", viewsController.getSearchedResults);

router.get(
  "/submit_property",
  authController.protect,
  authController.isLoggedIn,
  viewsController.submitProperty
);

router.get(
  "/submit_post",
  authController.isLoggedIn,
  authController.restrictTo("admin", "realtor"),
  viewsController.createPostPage
);

router.get("/resetPassword/:id", viewsController.resetPassword);

router.get("/forgot-password", viewsController.forgotPasswordPage);

module.exports = router;
