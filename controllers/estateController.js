const catchAsync = require("../utils/catchAsync");
const Realestate = require("../models/realestateModel");
const APIFeatures = require("../utils/apiFeatures");
const AppError = require("../utils/appError");
const multer = require("multer");
const sharp = require("sharp");
const fs = require("fs");

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(
      new AppError("This is not an image. Please, upload only images", 400),
      false
    );
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadEstateImages = upload.fields([
  {
    name: "image",
    maxCount: 1,
  },
  {
    name: "imageCover",
    maxCount: 3,
  },
]);

//This is for the image
exports.resizeEstateImages = catchAsync(async (req, res, next) => {

  if (!req.files.image || !req.files.imageCover) return next();

  // 1) Image
  req.body.image = `image-${req.user._id}-${Date.now()}.jpeg`;
  await sharp(req.files.image[0].buffer)
    .resize(750, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/assets/img/property/${req.body.image}`);

  // 2) Images
  req.body.imageCover = [];
  await Promise.all(
    req.files.imageCover.map(async (file, i) => {
      const filename = `image-${req.user._id}-${Date.now()}-${
        i + 1
      }-cover.jpeg`;
      await sharp(file.buffer)
        .resize(1920, 790)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`public/assets/img/property/${filename}`);
      req.body.imageCover.push(filename);
    })
  );
  next();
});

//this is for image cover

exports.getAllEstates = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Realestate.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const estates = await features.query;
  res.status(200).json({
    status: "success",
    length: estates.length,
    estates,
  });
});

exports.createEstate = catchAsync(async (req, res, next) => {
  req.body.realtor = req.user._id;
  const estate = await Realestate.create(req.body);
  res.status(201).json({
    status: "success",
    estate,
  });
});

exports.getEstate = catchAsync(async (req, res, next) => {
  const estate = await Realestate.findById(req.params.id);
  res.status(200).json({
    status: "success",
    estate,
  });
});

exports.updateEstate = catchAsync(async (req, res, next) => {
  const estate = await Realestate.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: "success",
    estate,
  });
});

exports.searchQuery = catchAsync(async (req, res, next) => {
  for (const quer in req.body) {
    if (req.body[quer] == "") {
      delete req.body[quer];
    }
  }
  const estates = await Realestate.find(req.body);
  res.status(200).json({
    status: "success",
    length: estates.length,
    data: estates,
  });
});

exports.deleteEstate = catchAsync(async (req, res, next) => {
  const estate = await Realestate.findById(req.params.id);
  try {
    fs.unlinkSync(`public/assets/img/property/${estate.image}`);
    estate.imageCover.forEach((est) => {
      fs.unlinkSync(`public/assets/img/property/${est}`);
    });
  } catch (err) {
    return new AppError(err, 400);
  }
  await Realestate.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: "success",
  });
});

exports.getSearchedProperty = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Realestate.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const estates = await features.query;
  res.status(200).json({
    status: "success",
    length: estates.length,
    data: estates,
  });
});
