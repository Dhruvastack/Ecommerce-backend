const express = require("express");
const { adminMiddleware, requireSignin } = require("../common-middleware");

const { addCart } = require("../controller/cart");
const router = express.Router();
router.post("/cart/add", requireSignin, adminMiddleware, addCart);

module.exports = router;
