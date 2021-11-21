const express = require('express');
const res = require('express/lib/response');
const async = require('hbs/lib/async');

const router = express.Router();


const cocktailAPI = require("../apis/api");
const { response } = require('../app');



//FILTERS MAIN PAGE
router.get("/", (req,res)=>res.render("cocktails/filters"))

//ALPHABETIC ORDER FILTER

router.get("/alphabet", (req,res)=>res.render("cocktails/alphabet-order"))

//ALPHABETIC  FILTER FOR EACH LETTER
router.get("/alphabet/:letter", (req, res)=>{
  const {letter} = req.params

  cocktailAPI.getByLetter(letter)
    .then(apiResponse=>{
      res.render("cocktails/cocktail-list", {cocktails: apiResponse.data.drinks})
    })
    .catch(console.log)

})

// FILTER BY GLASS
router.get("/glasses", (req,res)=>{
  cocktailAPI.getGlassList()
  .then(apiResponse=>{
    res.render("cocktails/glass-list", {glasses: apiResponse.data.drinks})
  })
  .catch(console.log)
})

// FILTER BY NON-ALCOHOLIC
router.get("/non-alcoholic", (req,res)=>{
  cocktailAPI.getByNonAlcoholic()
  .then(apiResponse=>{
    res.render("cocktails/cocktail-list", {cocktails: apiResponse.data.drinks})
  })
  .catch(console.log)
})
//GET RANDOM COCKTAIL
  router.get("/random", (req, res)=>{
    cocktailAPI.getRandom()
    .then(apiResponse=>{
      res.render("cocktails/random-cocktail", {cocktail: apiResponse.data.drinks[0]})

    })
    .catch(console.log)
  })

  //FIND BY ID TO SEE COCKTAIL DETAILS
  router.get("/:id", (req, res) =>{
    const {id} = req.params

    cocktailAPI.getById(id)
    .then(apiResponse=>{
      console.log(apiResponse.data.drinks[0])
      
      res.render("cocktails/cocktail-details", {cocktail: apiResponse.data.drinks[0]})

    })
    .catch(console.log)
  })

  module.exports = router;

