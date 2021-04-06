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
    cb(null, nanoid() + "-" + Date.now() + file.originalname);
  },
});

const upload = multer({
  storage: storage,

  fileFilter: function (req, file, callback) {
    if (!file.originalname.match(/\.(jpeg|jpg|png)$/)) {
      callback(new Error("only upload files with jpg or jpeg or png format."));
    }
    callback(null, true);
  },
});

router.post(
  "/product/create",
  requireSignin,
  adminMiddleware,
  upload.array("productPictures"),
  addProduct
);
router.get("/product/all", getProducts);

module.exports = router;
