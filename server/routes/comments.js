var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const Comments = require("../models/comments.js");
const Snippets = require("../models/snippets.js");
const verifyUser = require("./middleware.js");
const jwt = require("jsonwebtoken");
const comments = require("../models/comments.js");

/* GET all comments for a snippet. */
router.get("/:identifier", function (req, res, next) {
  Comments.find({ snippetId: req.params.identifier }, (err, comments) => {
    if (err) return next(err);
    if (comments) {
      return res.json(comments);
    } else {
      return res.status(404).send("Not found");
    }
  });
});

/* POST a comment for a snippet. */
router.post("/:identifier", verifyUser, function (req, res, next) {
  const token = req.headers["x-access-token"];
  const user = jwt.decode(token);
  if (!user) return res.status(400).send("unauthorized");

  Snippets.findOne({ _id: req.params.identifier }, (err, snippet) => {
    if (err) return next(err);
    if (snippet) {
      new Comments({
        creatorId: user.userId,
        creator: user.username,
        snippetId: snippet._id,
        comment: req.body.comment,
        likes: [],
      }).save((err) => {
        if (err) return next(err);
        return res.send(req.body);
      });
    } else {
      return res.status(404).send("Not found");
    }
  });
});

/* Update a comment. */
router.post("/update/:identifier", verifyUser, function (req, res, next) {
  Comments.findByIdAndUpdate(
    req.params.identifier,
    { comment: req.body.edited },
    function (err) {
      if (err) return next(err);
      return res.status(200).send("updated");
    }
  );
});

/* Delete a comment. */
router.post("/delete/:identifier", verifyUser, function (req, res, next) {
  Comments.findByIdAndDelete(req.params.identifier, function (err) {
    if (err) return next(err);
    return res.status(200).send("deleted");
  });
});

/* Like a comment. */
router.post("/like/:identifier", verifyUser, function (req, res, next) {
  const token = req.headers["x-access-token"];
  const user = jwt.decode(token);
  if (!user) return res.status(400).json("unauthorized");

  //Add or remove users id from comments likes
  Comments.findOne({ _id: req.params.identifier }, (err, comment) => {
    if (err) return next(err);
    if (comment) {
      var likes = comment.likes;
      if (likes.length === 0) {
        likes.push(user.userId);
      } else {
        const isLiked = likes.find((userId) => userId === user.userId);
        if (!isLiked) {
          likes.push(user.userId);
        } else {
          const index = likes.indexOf(user.userId);
          likes.splice(index, 1);
        }
      }
      Comments.findByIdAndUpdate(
        req.params.identifier,
        { likes: likes },
        function (err) {
          if (err) return next(err);
          return res.status(200).json({ likeAmount: likes.length });
        }
      );
    } else {
      return res.status(404).send("Not found");
    }
  });
});

module.exports = router;
