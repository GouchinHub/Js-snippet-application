var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const Snippets = require("../models/snippets.js");

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

/* POST a snippet. */
router.post("/", function (req, res, next) {
  Snippets.findOne({ title: req.body.title }, (err, title) => {
    if (err) return next(err);
    if (!title) {
      new Snippets({
        id: req.body.id,
        ownerId: req.body.ownerId,
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

module.exports = router;
