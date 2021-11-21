const express = require('express');
const res = require('express/lib/response');
const async = require('hbs/lib/async');

const router = express.Router();


const cocktailAPI = require("../apis/api");
const { response } = require('../app');

//filter by ingredient
router.get("/ingredient", (req, res)=>{
  cocktailAPI.getByIngredient()
  .then(()=>res.render("cocktails/ingredient"))
  .catch(console.log)
})

router.get("/", (req, res)=>{
    cocktailAPI.getAll()
    .then(apiResponse=>res.render("cocktails/cocktail-list", {cocktails: apiResponse.data.drinks}))
    .catch(console.log)
  })

  router.get("/random", (req, res)=>{
    cocktailAPI.getRandom()
    .then(apiResponse=>{
      res.render("cocktails/random-cocktail", {cocktail: apiResponse.data.drinks[0]})
    })
    .catch(console.log)
  })

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

