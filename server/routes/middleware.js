const jwt = require("jsonwebtoken");

//middleware for user authorization
const verifyUser = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    res.status(401).send("unauthorized");
  } else {
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        res.status(401).send("unauthorized");
      } else {
        req.userId = decoded.id;
        next();
      }
    });
  }
};

module.exports = verifyUser;
