require("dotenv").config();
const jwt = require("jsonwebtoken");

//jwt token verification
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      res.status(404).send("please provide valid token");
    } else {
      req.userId = user.matchedUser._id;
      next();
    }
  })
};


module.exports=verifyToken
