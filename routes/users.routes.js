var express = require('express');
var router = express.Router();
const bcrypt = require("bcrypt")

// to get user model
const User = require("../models/User.model")
const isLoggedIn = require('./../middleware/isLoggedIn')

const multerUploader = require("../middleware/multerUploader")




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
    res.redirect("/")

  })

//LOGIN
 router.route("/login")
  .get((req, res, next)=>{
    res.render("login")
  })
.post( async (req, res)=>{
    const {username, password} = req.body
    if(!username || !password){res.render("login", {error:{type: "CRED_ERR", msg: "Missing credentials"}})}

    const loggedInUser = await User.findOne({username})
    if(!loggedInUser) {res.render("signup", {error:{type: "USR_ERR", msg: "User does not exist"}})}
    
    const pwsIsCorrect = bcrypt.compareSync(password, loggedInUser.password)

    if(pwsIsCorrect){
      req.session.loggedInUser = loggedInUser
      res.redirect("/users/welcome-page")
      
    }else{
      res.render(res.render("login", {error:{type: "PWD_ERR", msg: "Password incorrect"}}))
    }
}) 




//PROFILE 
router.route("/profile")
.get((req, res)=>{

  if(req.session.loggedInUser){
    const {_id} = req.session.loggedInUser

    User.findById(_id)
    .then((user)=>{
  
      res.render('profile', {user})
  
    })
  }else{
    res.render("login")
  }
 
})


//EDIT USER
router.route("/:id/edit")
  .get((req, res)=>{
    const {_id} = req.session.loggedInUser
    User.findById(_id)
    .then((user)=>{
      res.render('edit-profile', {user})
  
    })
  })
 .post((req, res)=>{
  const {_id} = req.session.loggedInUser
  const {username} = req.body
  User.findByIdAndUpdate(_id, {username})
  .then(()=>res.redirect(`/users/profile`))
 })

 //LOGOUT
router.get('/logout', (req, res) => {
	req.session.destroy((err) => {
		if (err) res.redirect('/');
		else res.redirect('/users/login');
	});
});



//NEW COCKTAIL ROUTE TO DB

router.route("/create-cocktail",)
.get((req, res)=>{
  res.render("cocktails/create-form")
})
.post(isLoggedIn, multerUploader.single("imgUrl"), async (req, res)=>{
     const { cocktailName, alcoholic, glassType, ingredientsAndMeasures, instructions, owner } = req.body
     console.log("req.body:", req.body)
     try {
       if (!cocktailName || !alcoholic  || !ingredientsAndMeasures || !instructions ) throw new Error("All fields required")
       const newCocktail = await Cocktail.create({ cocktailName, alcoholic, glassType, ingredientsAndMeasures, instructions, owner })
       res.redirect("/cocktailDetails")
     } catch (error) {
       res.render("cocktails/cocktail-details", { error })
     }})

     //const {path: imgUrl} = req.file

   module.exports = router;

  