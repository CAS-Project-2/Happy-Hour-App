var express = require("express");
var router = express.Router();

const User = require("../models/User.model");
const Api = require("../apis/api");

// welcome page
router.route("/").get((req, res) => {
  //random quote
    const quotes = [
       
            "It takes 6 minutes for the brain to react to alcohol.",
 
            "Moonshine accounts for around 30% of the world’s alcohol drinking.",
           
            "Cenosillicaphobia is the fear of an empty glass.",
           
            "You will need around 600 grapes to make a bottle of red wine.",
           
            "There are approx. 49 million bubbles in a bottle of champagne.",
           
            "Vodka is the world’s most popular alcohol with approx. 5 billion litres consumed per year.",
           
            "The strongest beer in the world is 67.5% alcohol.",
           
            "It’s illegal to get a fish drunk in Ohio."
            ]
            const random = Math.floor(Math.random()* quotes.length)
            console.log("quote:", random)
            const q = quotes[random]
  
  if (req.session.loggedInUser) {
    const { _id } = req.session.loggedInUser;

    User.findById(_id).then((user) => {
      res.render("welcome-page", { user,q });
    });
  } else {
    res.render("welcome-page",{q});
  }


});

// get from API
router.get("/api", (req, res) => {
  Api.getAll().then((entity) =>
    res.render("index", { title: "Express", users: entity })
  );
});


// Get random quote


module.exports = router;
