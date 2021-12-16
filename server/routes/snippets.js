var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const Snippets = require("../models/snippets.js");
const verifyUser = require("./middleware.js");
const jwt = require("jsonwebtoken");

/* GET all snippets. */
router.get("/", function (req, res, next) {
  Snippets.find({}, (err, snippets) => {
    if (err) return next(err);
    if (snippets) {
      return res.json(snippets);
    } else {
      return res.status(404).send("Not found");
    }
  });
});

/* GET a single snippet. */
router.get("/:identifier", function (req, res, next) {
  Snippets.findOne({ _id: req.params.identifier }, (err, snippet) => {
    if (err) return next(err);
    if (snippet) {
      return res.json(snippet);
    } else {
      return res.status(404).send("Not found");
    }
  });
});

/* POST a new snippet. */
router.post("/", verifyUser, function (req, res, next) {
  const token = req.headers["x-access-token"];
  const user = jwt.decode(token);
  if (!user) return res.status(400).send("unauthorized");

  Snippets.findOne({ title: req.body.title }, (err, title) => {
    if (err) return next(err);
    if (!title) {
      new Snippets({
        creatorId: user.userId,
        creator: user.username,
        title: req.body.title,
        snippet: req.body.snippet,
      }).save((err) => {
        if (err) return next(err);
        return res.send(req.body);
      });
    } else {
      return res.status(403).send("Snippet of this title already exists.");
    }
  });
});

/* Update a snippet. */
router.post("/update/:identifier", verifyUser, function (req, res, next) {
  Snippets.findByIdAndUpdate(
    req.params.identifier,
    { snippet: req.body.newSnippetContent },
    function (err) {
      if (err) return next(err);
      return res.status(200).send("updated");
    }
  );
});

/* Delete a snippet. */
router.post("/delete/:identifier", verifyUser, function (req, res, next) {
  Snippets.findByIdAndDelete(req.params.identifier, function (err) {
    if (err) return next(err);
    return res.status(200).send("deleted");
  });
});

/* Like a snippet. */
router.post("/like/:identifier", verifyUser, function (req, res, next) {
  const token = req.headers["x-access-token"];
  const user = jwt.decode(token);
  if (!user) return res.status(400).json("unauthorized");

  //Add or remove users id from snippets likes
  Snippets.findOne({ _id: req.params.identifier }, (err, snippet) => {
    if (err) return next(err);
    if (snippet) {
      var likes = snippet.likes;
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
      Snippets.findByIdAndUpdate(
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
