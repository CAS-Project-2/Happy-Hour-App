const express = require('express');
const res = require('express/lib/response');
const async = require('hbs/lib/async');

const router = express.Router();


const cocktailAPI = require("../apis/api");
const { response } = require('../app');

//FILTER BY INGREDIENT 

router.get("/liquor", (req, res)=>{res.render("cocktails/liquor")})

//FILTER BY LIQUOR - NOT WORKING

router.get("/liquor/:alcohol", (req, res)=>{
  const {alcohol} = req.params
  console.log("hello")
  cocktailAPI.getByLiquor(alcohol)
  .then(apiResponse=>{
    console.log(apiResponse.data.drinks)
    res.render("cocktails/filtered-liquor", {cocktails: apiResponse.data.drinks,alcohol})})
  .catch(console.log)
})

//ROUTE TO RUMS LIST

router.get("/rums", (req, res)=>{res.render("cocktails/liquor/rums-list")})

//ROUTE TO FRUITY-LIQUORS LIST

router.get("/fruity", (req, res)=>{res.render("cocktails/liquor/fruity-list")})

//ROUTE TO COFFEE-LIQUORS LIST

router.get("/coffee", (req, res)=>{res.render("cocktails/liquor/coffee-list")})

//ROUTE TO WHISKIES LIST

router.get("/whiskies", (req, res)=>{res.render("cocktails/liquor/whiskies-list")})

router.get("/", (req, res)=>{
    cocktailAPI.getAll()
  .then(apiResponse=>
    
    res.render("cocktails/cocktail-list", {cocktails: apiResponse.data.drinks}))
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

