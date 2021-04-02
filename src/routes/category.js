const express = require("express");

const {addcategory,getCategories} = require("../controller/category")
const router = express.Router();
router.post("/category/create",addcategory);
router.get("/category/all",getCategories);
module.exports = router;
