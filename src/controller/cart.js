const Cart = require("../models/cart");
const jwt = require("jsonwebtoken");

const slugify = require("slugify");
exports.addCart = (req, res) => {
  //
  const cart = new Cart({
    user: req.user._id,
    cartItems: req.body.cartItems,
  });
  cart.save((err, cart) => {
    if (err) return res.status(400).json({ error: err });
    if (cart) {
      return res.status(200).json({ cart });
    }
  });
};
