const Product = require("../models/product");
const jwt = require("jsonwebtoken");

const { nanoid } = require("nanoid");
const slugify = require("slugify");
exports.addProduct = (req, res) => {
  // res.status(200).json({ file: req.files, body: req.body });
  const {
    name,
    price,
    description,
    quantity,
    // reviews,
    category,
    offer,
    createdBy,
    
  } = req.body;

  let productPictures = [];

  if (req?.files?.length > 0) {
    productPictures = req.files.map((file) => {
      return { img: file.filename };
    });
  }
  const product = new Product({
    name: name,
    slug: slugify(name),
    price,
    quantity,
    description,
    offer,
    productPictures,
    // reviews,
     category,
     createdBy: req.user._id,
  });

  product.save((err, product) => {
    if (err) return res.status(400).json({ error: err });
    if (product) {
      res.status(200).json({ product });
    }
  });
};

exports.getProducts = (req, res) => {};
