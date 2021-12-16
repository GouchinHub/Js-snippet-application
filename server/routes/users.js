var express = require("express");
const Users = require("../models/users");
const mongoose = require("mongoose");
var router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const verifyUser = require("./middleware");
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get("/:token", verifyUser, (req, res) => {
  const user = jwt.decode(req.params.token);
  if (user) {
    return res
      .status(200)
      .json({ userId: user.userId, username: user.username });
  } else {
    return res.status(400).send("unauthorized");
  }
});

/* Create a user. */
router.post(
  "/register",
  upload.none(),
  body("password").isStrongPassword(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: "Password is not strong enough" });
    }
    Users.findOne({ username: req.body.username }, (err, user) => {
      if (err) throw err;
      if (user) {
        return res.status(403).json({ error: "Username already in use" });
      } else {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) throw err;
            Users.create(
              {
                username: req.body.username,
                password: hash,
              },
              (err, ok) => {
                if (err) throw err;
                return res.status(200).json({ response: "ok" });
              }
            );
          });
        });
      }
    });
  }
);

/* Login to user */
router.post("/login", upload.none(), (req, res, next) => {
  Users.findOne({ username: req.body.username }, (err, user) => {
    if (err) throw err;
    if (!user) {
      return res.status(403).json({
        error: "Invalid credentials",
      });
    } else {
      bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          const jwtPayoload = {
            username: user.username,
            userId: user._id,
          };
          jwt.sign(jwtPayoload, process.env.SECRET, (err, token) => {
            if (err) throw err;
            const body = {
              username: user.username,
              token: token,
            };
            res.json(body);
          });
        } else {
          return res.status(403).json({
            error: "Invalid credentials",
          });
        }
      });
    }
  });
});

module.exports = router;
