var express = require('express');
var router = express.Router();
// to get user model
const User = require("../models/User.model")

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// routes for signup or register
router.route('/signup')
.get((req, res, next) => {
  res.render('signup')
})
.post((req, res)=>{
  const {username,email,password} = req.body
  if(!username || !email || !password) res.render("signup",{errorMessage:"Invalid username or password or email"})
  User.findOne({username})
  .then((user)=>{
    //to check if user already exists
    if(user)res.render("signup",{errorMessage:"user exists, try to log in"})
    const salt = bcrypt.saltSync(saltRound)
    const hashPassword = bcrypt.hashSync(password, salt)
    //to crate the users if everything is find
    User.create({username,password:hashPassword})
    .then((req, res)=>{
      res.render("index")
    })
    .catch((error)=>{
      res.render("signup", {errorMessage:"Sorry for the inconvenience. Try again later."})
    })
  })
})

module.exports = router;
