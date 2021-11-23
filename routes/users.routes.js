var express = require('express');
var router = express.Router();
const bcrypt = require("bcrypt")

// to get user model
const User = require("../models/User.model")
const Cocktail = require("../models/Cocktail.model")
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
      res.redirect("/")
      
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


//CREATE COCKTAIL

router.route("/create-cocktail")
    .get(async (req, res)=>{
        try{
          //Passing the user for stablish the realtionship
          const {_id} = req.session.loggedInUser
          const user = await User.findById(_id)
          res.render("cocktails/create-form", {user})
        }catch(error){
          console.log(error)
        }
    })
    .post(multerUploader.single("imgUrl"),async (req,res)=>{
        try{
   
        const {name, alcoholic, glass, ingredients, instructions, owner}= req.body
    
        if(!name || !ingredients || !instructions){
          res.render("cocktails/create-form", { name, ingredients, instructions, error:{type: "CKTAIL_ERR", msg: "Missing fields"}})
        }

        const imgUrl = req.file.path

        await Cocktail.create({name, alcoholic, glass, ingredients, instructions, owner, imgUrl})
        res.redirect("/users/my-cocktails" )

        }catch(error){
            console.log(error)
        }

    })


//EDIT USER COCKTAIL
router.route("/my-cocktails/:id/edit")
.get((req, res) => {

  const {id } = req.params
  Cocktail.findById(id).populate("User")
  .then((cocktail)=>{
    res.render("cocktails/edit-form", {cocktail})
  })
  .catch((error)=>{
    console.log(error)
  })
})
.post((req, res) => {

  const {id} = req.params
  const {name, alcoholic, glass, ingredients, instructions, owner} = req.body
  
    Cocktail.findByIdAndUpdate(id, {name, alcoholic, glass, ingredients, instructions, owner}, {new: true} )
    .then(()=>{
      res.redirect(`/users/my-cocktails/${id}`);
    })
    .catch((err) => {
      console.log(err);
    });
});

//DELETE COCKTAIL
router.get('/my-cocktails/:id/delete', (req, res) => {
 
  const {id} = req.params

  Cocktail.findByIdAndDelete(id)
  .then(()=>{
    res.redirect("/users/my-cocktails");
  })

});

//VIEW USER COCKTAIL DETAILS
router.get("/my-cocktails/:id", (req,res)=>{
  const {id}= req.params
  Cocktail.findById(id)
  .populate("User")
  .then((cocktail)=>{
  
    res.render("cocktails/user-cocktail", {cocktail})
  })
  .catch(console.log)
  
})

//NEW COCKTAIL ROUTE TO DB
router.get("/my-cocktails", (req,res)=>{
    //Filter only currently user created cocktails:
  const {_id} = req.session.loggedInUser
  Cocktail.find({owner: _id})
  .then((cocktails)=>{

    res.render("cocktails/my-cocktails", {cocktails})
  })
  .catch(console.log)
  
})


/* 
router.route("/create-cocktail",)
.get((req, res)=>{
  
  res.render("cocktails/create-form")
})
.post(isLoggedIn, multerUploader.single("imgUrl"), (req, res)=>{

    const { name, alcoholic, glass, ingredients, instructions, owner } = req.body
  
    Cocktail.create({ name, alcoholic, glass, ingredients, instructions, owner })
    .then(()=> res.redirect("/users/my-cocktails"))
    .catch(console.log)
  }) */
  
/*      const { cocktailName, alcoholic, glassType, ingredientsAndMeasures, instructions, owner } = req.body
     console.log("req.body:", req.body)
     try {
       if (!cocktailName || !alcoholic  || !ingredientsAndMeasures || !instructions ) throw new Error("All fields required")
       const newCocktail = await Cocktail.create({ cocktailName, alcoholic, glassType, ingredientsAndMeasures, instructions, owner })
       res.redirect("/cocktailDetails")
     } catch (error) {
       res.render("cocktails/cocktail-details", { error })
     } */
    
  //  })

     //const {path: imgUrl} = req.file


  // USERS COCKTAIL-LIST

  router.route('/my-cocktails', async (req, res) => {
    try {
        listUserCocktails = await UserCocktails.find()
        res.render('cocktails/my-cocktails', { UserCocktails: listUserCocktails});
    }
    catch (error) {
        res.render('cocktails/my-cocktails', {error});
    }
});

   module.exports = router;

  