var express = require('express');
var router = express.Router();

/* GET signup page */
router.get('/', (req, res, next)=> {
  res.render('signup-form');
});

  module.exports = router;