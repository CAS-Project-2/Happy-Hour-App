const express = require('express');
const res = require('express/lib/response');
const async = require('hbs/lib/async');
const api = require('../apis/api');

const router = express.Router();

const cocktailAPI = require("../apis/api");
const { response } = require("../app");



//FILTER BY INGREDIENT

router.get("/liquor", (req, res) => {
  res.render("cocktails/liquor");
});

//FILTER BY LIQUOR 

router.get("/liquor/:alcohol", (req, res) => {
  const { alcohol } = req.params;
  console.log("hello");
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
  console.log("hello");
  cocktailAPI
    .getByLiquor(alcohol)
    .then((apiResponse) => {
      console.log(apiResponse.data.drinks);
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
  console.log("hello");
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
  console.log("hello");
  cocktailAPI
    .getByLiquor(alcohol)
    .then((apiResponse) => {
      console.log(apiResponse.data.drinks);
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
  console.log("hello");
  cocktailAPI
    .getByLiquor(alcohol)
    .then((apiResponse) => {
      console.log(apiResponse.data.drinks);
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

//GLASS FILTERED !!NOT WORKING!!

router.get("/glasses/:glass", (req, res) => {
  const { glass } = req.params;

  cocktailAPI
    .filterByGlass(glass)
    .then((apiResponse) => {
      console.log(glass);
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

//GET RANDOM COCKTAIL
router.get("/random", (req, res) => {
  cocktailAPI
    .getRandom()
    .then((apiResponse) => {
      res.render("cocktails/cocktail-details", {
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
