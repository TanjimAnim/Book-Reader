const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];
  if (!token) {
    throw new Error("A token is required for authentication");
  }

  const verifiedUser = jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      throw new Error("Invalid token");
    } else {
      return decoded;
    }
  });

  req.body.email = verifiedUser.email;
  next();
};

module.exports = verifyToken;
