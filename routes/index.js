var express = require("express");
var router = express.Router();

const User = require("../models/User.model");
const Api = require("../apis/api");

// welcome page
router.route("/").get((req, res) => {
  //random quote
    const quotes = [
       
      "It takes 6 minutes for the brain to react to alcohol.",
      "Homemade Moonshine accounts for around 30% of the world’s alcohol drinking.",          
      "Cenosillicaphobia is the fear of an empty glass.",           
      "You will need around 600 grapes to make a bottle of red wine.",           
      "There are approximately 49 million bubbles in a bottle of champagne.",           
      "Vodka is the world’s most popular alcohol with approximately 5 billion litres consumed per year.",           
      "The strongest beer in the world is 67.5% alcohol.",          
      "It’s illegal to get a fish drunk in Ohio.",
      "People with blue eyes have a greater alcohol tolerance.",
      "One shot of vodka has as much alcohol as an entire beer.",
      "Most fruits and almost all vegetables contain a small amount of alcohol.",
      "The first of March is known as “Alcohol Day.”",
      "Liquor makes a majority of people feel more confident.",
      "A gin & tonic will glow under a UV light because tonic contains quinines, which are UV light reactive.",
      "The most expensive scotch in the world is sold for $460,000 and that’s $14,000 per shot!",
      "I hate when people say that you don’t need alcohol to have fun. Well, you don’t need running shoes to run but it helps.",
      "Alcohol may not solve your problems, but neither will water or milk.",
      "When I drink alcohol, everyone says I’m an alcoholic. But when I drink Fanta, no one says I’m fantastic.",
      "May you always have love in your heart and beer in your belly.",

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
