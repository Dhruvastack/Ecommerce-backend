const express = require("express");
const router = express.Router();
const {validateSignupRequest,isRequestValidated, validateSignInRequest} = require('../validators/auth')
const { signup } = require("../controller/auth");
const { signin } = require("../controller/auth");
//const { requireSignin } = require("../controller/auth");
router.post("/signin", validateSignInRequest,isRequestValidated,signin);

router.post(
  "/signup",
  validateSignupRequest,
  isRequestValidated,
  signup
);
// router.post("/profile", requireSignin, (req, res) => {
//   res.status(200).json({ user: "profile" });
// });
module.exports = router;
