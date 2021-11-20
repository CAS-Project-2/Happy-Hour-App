var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//User LOGIN
router.get('/login', (req, res, next)=> {
  res.render('login-form');
});

//User SIGN UP
router.get('/signup', (req, res, next)=> {
  res.render('signup-form');
});

//USER WELCOME PAGE
router.get('/welcome', (req, res, next)=> {
  res.render('welcome-page');
});


module.exports = router;
