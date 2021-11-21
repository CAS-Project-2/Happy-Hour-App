var express = require('express');
var router = express.Router();
// to get user model
const User = require("../models/User.model")


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

//login page now!!
router.route("/login")

.get((req, res, next)=>{
  res.render("login")
})

.post((req, res)=>{
  // thinking to giv more options to user. user can use mail or username to login const usernameOrMail = username || email
  const {username, password} = req.body
  if(!username || !password) res.render("login", {errorMessage: "Username or password are required"})
  User.findOne({username})
  .then((user)=>{
    if(username) res.render("login", {errorMessage:"User does not exist"})
     // to check if the first pwd is matching the one encrypted from db
    const passwordCorrect = bcrypt.compareSync(password, user.password) 
    if(passwordCorrect)res.render("/index")
    else res.render("login", {errorMessage:"password is Wrong"})
  })
  .catch((error)=>{
    res.render("login", {errorMessage:"Sorry for the inconvenience. Try again later."})
  })
    
})



module.exports = router;
