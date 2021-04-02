const Product = require("../models/product");
const jwt = require("jsonwebtoken");

const { nanoid } = require("nanoid");

exports.addProduct = (req, res) => {
  res.status(200).json({ file: req.file, body: req.body });
};

exports.getProducts = (req, res) => {};
