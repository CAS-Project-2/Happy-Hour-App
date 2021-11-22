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
  res.redirect("/users/welcome-page")


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
    res.redirect("/users/welcome-page")
  }else{
    res.render(res.render("login", {error:{type: "PWD_ERR", msg: "Password incorrect"}}))
  }
    
}) 
//logout
router.get('/logout', (req, res) => {
	req.session.destroy((err) => {
		if (err) res.redirect('/');
		else res.redirect('/users/login');
	});
});

//profile
router.route("/profile")
.get((req, res)=>{
  res.render('profile')
})

//welcome page
router.route("/welcome-page")
.get((req, res)=>{
  res.render('welcome-page')
})

// edit profile
router.route("/edit-profile")
.get((req, res)=>{
  res.render('edit-profile')
})

//edit Username
router
  .route("/:id/edit")
  .get(async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      const allUsers = await User.find();
      const filteredUsers = allUsers.filter((cel) => {
        return !users.find((cas) => cel.name === cas.name);
      });

      res.render("users/edit-profile", { user, allUsers: filteredUsers });
    } catch (error) {
      console.log(error);
    }
  })
  .post(async (req, res) => {
    try {
      const { id } = req.params;
      const {username, favorites} = req.body;
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { username, favorites },
        { new: true }
      );
      res.redirect(`/users/${id}`);
    } catch (error) {
      console.log(error);
    }
  });

  router.post("/:id/delete", async (req, res) => {
    try {
      const { id } = req.params;
      const deletedFavorites = await User.findByIdAndDelete(id);
      console.log(deletedFavorites);
      res.redirect("/users");
    } catch (error) {
      console.log(error);
    }
  });





//find user

//edit user name and update them

//find my cocktail

// edit my cocktail and update them

//find my cocktail

//delete them



module.exports = router;
/* router
  .route("/:id/edit")
  .get(async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id).populate('user');
     // const allCelebs = await Celebrity.find();
      const filteredUser = user.filter((cel) => {
        return !users.user.find((cas) => cel.name === cas.name);
      });

      res.render("profile/username", { user, user: filteredUser });
    } catch (error) {
      console.log(error);
    }
  }) */