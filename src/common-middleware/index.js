const jwt = require("jsonwebtoken");
exports.requireSignin = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    // next();
    //jwt.decode()
  } else {
    return res.status(400).json({ message: "Authorization Required" });
  }
  next();
  // jwt.decode()
};

exports.userMiddleware = (req, res, next) => {};

exports.adminMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(400).json({ message: "Access denied" });
  }
  next();
};
