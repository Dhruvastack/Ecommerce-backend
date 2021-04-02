const express = require("express");
const { adminMiddleware, requireSignin } = require("../common-middleware");

const { addcategory, getCategories } = require("../controller/category");
const router = express.Router();
router.post("/category/create", requireSignin, adminMiddleware, addcategory);
router.get("/category/all", getCategories);
module.exports = router;
