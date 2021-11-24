const express = require('express');
const res = require('express/lib/response');
const async = require('hbs/lib/async');
const api = require('../apis/api');

const router = express.Router();

const Cocktail = require("../models/Cocktail.model")

const cocktailAPI = require("../apis/api");


//FILTER BY INGREDIENT

router.get("/liquor", (req, res) => {
  res.render("cocktails/liquor");
});

//FILTER BY LIQUOR 

router.get("/liquor/:alcohol", (req, res) => {
  const { alcohol } = req.params;

  cocktailAPI
    .getByLiquor(alcohol)
    .then((apiResponse) => {
      res.render("cocktails/filtered-liquor", {
        cocktails: apiResponse.data.drinks,
        alcohol: alcohol.replace("_", " "),
      });
    })
    .catch(console.log);
});

//FILTER BY FRUITY-LIQUORS

router.get("/fruity", (req, res) => {
  const { alcohol } = req.params;

  cocktailAPI
    .getByLiquor(alcohol)
    .then((apiResponse) => {

      res.render("cocktails/fruity-list", {
        cocktails: apiResponse.data.drinks,
        alcohol,
      });
    })
    .catch(console.log);
});

//FILTER BY COFFEE-LIQUORS

router.get("/coffee", (req, res) => {
  const { alcohol } = req.params;

  cocktailAPI
    .getByLiquor(alcohol)
    .then((apiResponse) => {

      res.render("cocktails/coffee-list", {
        cocktails: apiResponse.data.drinks,
        alcohol,
      });
    })
    .catch(console.log);
});

//FILTER BY WHISKIES

router.get("/whiskies", (req, res) => {
  const { alcohol } = req.params;
  cocktailAPI
    .getByLiquor(alcohol)
    .then((apiResponse) => {
      res.render("cocktails/whiskies-list", {
        cocktails: apiResponse.data.drinks,
        alcohol,
      });
    })
    .catch(console.log);
});

//FILTER BY RUMS

router.get("/rums", (req, res) => {
  const { alcohol } = req.params;
  cocktailAPI
    .getByLiquor(alcohol)
    .then((apiResponse) => {
      res.render("cocktails/rums-list", {
        cocktails: apiResponse.data.drinks,
        alcohol,
      });
    })
    .catch(console.log);
});

//FILTERS MAIN PAGE
router.get("/", (req, res) => res.render("cocktails/filters"));

//ALPHABETIC ORDER FILTER

router.get("/alphabet", (req, res) => res.render("cocktails/alphabet-order"));

//ALPHABETIC  FILTER FOR EACH LETTER
router.get("/alphabet/:letter", (req, res) => {
  const { letter } = req.params;

  cocktailAPI
    .getByLetter(letter)
    .then((apiResponse) => {
      res.render("cocktails/cocktail-list", {
        cocktails: apiResponse.data.drinks,
      });
    })
    .catch(console.log);
});

// GLASS FILTER LIST
router.get("/glasses", (req,res)=>{

  cocktailAPI.getGlassList()
  .then(apiResponse=>{
    res.render("cocktails/glass-list", {glasses: apiResponse.data.drinks})
  })
  .catch(console.log)
})

//GLASS FILTERED

router.get("/glasses/:glass", (req, res) => {
  const { glass } = req.params;
console.log(glass)
  cocktailAPI
    .filterByGlass(glass)
    .then((apiResponse) => {
     
      res.render("cocktails/cocktailsByGlass", {glasses: apiResponse.data.drinks, glass });
    })
    .catch(console.log);
});

// FILTER BY NON-ALCOHOLIC
router.get("/non-alcoholic", (req, res) => {
  cocktailAPI
    .getByNonAlcoholic()
    .then((apiResponse) => {
      res.render("cocktails/cocktail-list", {
        cocktails: apiResponse.data.drinks,
      });
    })
    .catch(console.log);
});


router.get("/community/:id/delete", (req, res)=>{
  const {id} = req.params

  Cocktail.findByIdAndDelete(id)
  .then(()=>{
    res.redirect("/cocktail/community");
  })

})

router.route("/community/:id/edit")
.get((req, res) => {

  const {id } = req.params
  Cocktail.findById(id).populate("User")
  .then((cocktail)=>{
    res.render("cocktails/edit-form", {cocktail})
  })
  .catch((error)=>{
    console.log(error)
  })
})
.post((req, res) => {

    const {id} = req.params
    const {name, alcoholic, glass, ingredients, instructions, owner} = req.body
  
    Cocktail.findByIdAndUpdate(id, {name, alcoholic, glass, ingredients, instructions, owner}, {new: true} )
    .then(()=>{
      res.redirect(`/cocktail/community`);
    })
    .catch((err) => {
      console.log(err);
    });
});


router.get("/community/:id", (req, res)=>{

  const {id}= req.params
  Cocktail.findById(id).populate("User")
  .then((cocktail)=>{

    if (req.session.loggedInUser._id == cocktail.owner) {
      console.log(req.session.loggedInUser._id, cocktail.owner)
      console.log("hello")
      var showEdit = true; 
      var showDelete = true;
    } 
    res.render("cocktails/community-cocktail-details", {cocktail, showEdit, showDelete})

  })

})
router.get("/community", (req, res)=>{
  Cocktail.find()
  .then((cocktails)=>{
    res.render("cocktails/community-cocktails", {cocktails})

  })

})


//GET RANDOM COCKTAIL
router.get("/random", (req, res) => {
  cocktailAPI
    .getRandom()
    .then((apiResponse) => {
      res.render("cocktails/random-cocktail", {
        cocktail: apiResponse.data.drinks[0],
      });
    })
    .catch(console.log);
});

//FIND BY ID TO SEE COCKTAIL DETAILS
router.get("/:id", (req, res) => {
  const { id } = req.params;

  cocktailAPI
    .getById(id)
    .then((apiResponse) => {
      res.render("cocktails/cocktail-details", {
        cocktail: apiResponse.data.drinks[0],
      });
    })
    .catch(console.log);
});

module.exports = router;
