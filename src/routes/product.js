const express = require("express");
const multer = require("multer");
const { nanoid } = require("nanoid");
var ID = nanoid();
const { adminMiddleware, requireSignin } = require("../common-middleware");
const { addProduct, getProducts } = require("../controller/product");
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, nanoid(10) + "-" + file.originalname + Date.now());
  },
});

const upload = multer({ storage: storage });
router.post(
  "/product/create",
  requireSignin,
  adminMiddleware,
  upload.single("productPictures"),
  addProduct
);
router.get("/product/all", getProducts);

module.exports = router;
