var express = require('express');
var router = express.Router();
const bcrypt = require("bcrypt")

// to get user model
const User = require("../models/User.model")


router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// routes for signup or register
router.route('/signup')
.get((req, res) => {
  res.render('signup');
})
.post( async (req, res)=>{
const {username, email, password, favcocktail} = req.body
  if(!username || !email || !password){
    res.render("signup", { username, email, error:{type: "CRED_ERR", msg: "Missing credentials"}})
  }

  const user = await User.findOne({email})
  if(user){
    res.render("signup", { username, email, error:{type: "USR_ERR", msg: "Email exists"}})
  }

  const salt = bcrypt.genSaltSync(5)
  const hashPwd = bcrypt.hashSync(password, salt)

  await User.create({username, email, password: hashPwd, favcocktail})
  res.render("welcome-page")


})
//login page now!!
router.route("/login")

.get((req, res, next)=>{
  res.render("login")
})

.post( async (req, res)=>{
  const {username, password} = req.body
  if(!username || !password){res.render("login", {error:{type: "CRED_ERR", msg: "Missing credentials"}})}

  const loggedInUser = await User.findOne({username})
  if(!loggedInUser) {res.render("login", {error:{type: "USR_ERR", msg: "User does not exist"}})}
  
  const pwsIsCorrect = bcrypt.compareSync(password, loggedInUser.password)

  if(pwsIsCorrect){
    req.session.loggedInUser = loggedInUser
    res.render("welcome-page")
  }else{
    res.render(res.render("login", {error:{type: "PWD_ERR", msg: "Password incorrect"}}))
  }
    
})





module.exports = router;
