var express = require('express');
var router = express.Router();

const cocktailAPI = require("../apis/api");
const { response } = require('../app');


router.get("/", (req, res)=>{
    cocktailAPI.getAll()
    .then(apiResponse=>res.render("index", {cocktails: apiResponse.data.drinks}))
    .catch(console.log)
  })

  module.exports = router;