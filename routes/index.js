var express = require("express");
var router = express.Router();

const User = require("../models/User.model");
const Api = require("../apis/api");

// welcome page
router.route("/").get((req, res) => {
  if (req.session.loggedInUser) {
    const { _id } = req.session.loggedInUser;

    User.findById(_id).then((user) => {
      res.render("welcome-page", { user });
    });
  } else {
    res.render("welcome-page");
  }
});

// get from API
router.get("/api", (req, res) => {
  Api.getAll().then((entity) =>
    res.render("index", { title: "Express", users: entity })
  );
});

module.exports = router;
