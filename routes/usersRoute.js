const express = require("express");
const authController = require("../controllers/authController");
const usersController = require("../controllers/usersController");
const fs = require("fs");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.protect, authController.logout);
router.post("/forgetPassword", authController.forgetPassword);
router.post("/resetPassword/:token", authController.resetPassword);

router.patch(
  "/updateMe",
  authController.protect,
  usersController.uploadUserPhoto,
  usersController.resizeUserPhoto,
  usersController.updateMe
);

router.patch(
  "/updatePassword",
  authController.protect,
  authController.updatePassword
);

router.route("/").get(usersController.getAllUsers);
router
  .route("/:id")
  .get(usersController.getUser)
  .delete(usersController.deleteMe);

module.exports = router;
