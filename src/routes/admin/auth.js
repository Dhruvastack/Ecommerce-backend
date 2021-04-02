const express = require("express");
const router = express.Router();
const { signup } = require("../../controller/admin/auth");
const { signin } = require("../../controller/admin/auth");
const {
  validateSignInRequest,
  validateSignupRequest,
  isRequestValidated,
} = require("../../validators/auth");
// const { requireSignin } = require("../controller/auth");
router.post("/admin/signin", validateSignInRequest, signin);

router.post("/admin/signup", validateSignupRequest, isRequestValidated, signup);

module.exports = router;
