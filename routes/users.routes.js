var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");

// to get user model
const User = require("../models/User.model");
const Cocktail = require("../models/Cocktail.model");
const isLoggedIn = require("./../middleware/isLoggedIn");
const multerUploader = require("../middleware/multerUploader");

// routes for signup and register
router
  .route("/signup")
  .get((req, res) => {
    res.render("signup");
  })
  .post(async (req, res) => {
    const { username, email, password, favcocktail } = req.body;
    if (!username || !email || !password) {
      res.render("signup", {
        username,
        email,
        error: { type: "CRED_ERR", msg: "Missing credentials" },
      });
    }

    const user = await User.findOne({ email });
    if (user) {
      res.render("signup", {
        username,
        email,
        error: { type: "USR_ERR", msg: "Email exists" },
      });
    }

    const salt = bcrypt.genSaltSync(5);
    const hashPwd = bcrypt.hashSync(password, salt);

    await User.create({ username, email, password: hashPwd, favcocktail });
    res.redirect("/");
  });

// route for login
router
  .route("/login")
  .get((req, res, next) => {
    res.render("login");
  })
  .post(async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
      res.render("login", {
        error: { type: "CRED_ERR", msg: "Missing credentials" },
      });
    }

    const loggedInUser = await User.findOne({ username });
    if (!loggedInUser) {
      res.render("signup", {
        error: { type: "USR_ERR", msg: "User does not exist" },
      });
    }

    const pwsIsCorrect = bcrypt.compareSync(password, loggedInUser.password);

    if (pwsIsCorrect) {
      req.session.loggedInUser = loggedInUser;
      res.redirect("/");
    } else {
      res.render(
        res.render("login", {
          error: { type: "PWD_ERR", msg: "Password incorrect" },
        })
      );
    }
  });

// route to profile
router.route("/profile").get((req, res) => {
  if (req.session.loggedInUser) {
    const { _id } = req.session.loggedInUser;
    User.findById(_id).then((user) => {
      res.render("profile", { user });
    });
  } else {
    res.render("login");
  }
});

// route to edit user
router
  .route("/:id/edit")
  .get((req, res) => {
    const { _id } = req.session.loggedInUser;
    User.findById(_id).then((user) => {
      res.render("edit-profile", { user });
    });
  })
  .post((req, res) => {
    const { _id } = req.session.loggedInUser;
    const { username } = req.body;
    User.findByIdAndUpdate(_id, { username }).then(() =>
      res.redirect(`/users/profile`)
    );
  });

// route to logout
router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) res.redirect("/");
    else res.redirect("/users/login");
  });
});

// route to create cocktail
router
  .route("/create-cocktail")
  .get(async (req, res) => {
    try {
      //Passing the user for stablish the realtionship
      if (req.session.loggedInUser) {
        const { _id } = req.session.loggedInUser;
        const user = await User.findById(_id);
        res.render("cocktails/create-form", { user });
      } else {
        res.render("login");
      }
    } catch (error) {
      console.log(error);
    }
  })
  .post(multerUploader.single("imgUrl"), async (req, res) => {
    try {
      const { name, alcoholic, glass, ingredients, instructions, owner } =
        req.body;

      if (!name || !ingredients || !instructions) {
        res.render("cocktails/create-form", {
          name,
          ingredients,
          instructions,
          error: { type: "CKTAIL_ERR", msg: "Missing fields" },
        });
      }

      let imgUrl;
      if (req.file) {
        imgUrl = req.file.path;
      } else {
        imgUrl =
          "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg";
      }

      await Cocktail.create({
        name,
        alcoholic,
        glass,
        ingredients,
        instructions,
        owner,
        imgUrl,
      });
      res.redirect("/users/my-cocktails");
    } catch (error) {
      console.log(error);
    }
  });

// route to edit user profile
router
  .route("/my-cocktails/:id/edit")
  .get((req, res) => {
    const { id } = req.params;
    Cocktail.findById(id)
      .populate("User")
      .then((cocktail) => {
        res.render("cocktails/edit-form", { cocktail });
      })
      .catch((error) => {
        console.log(error);
      });
  })
  .post((req, res) => {
    const { id } = req.params;
    const { name, alcoholic, glass, ingredients, instructions, owner } =
      req.body;

    Cocktail.findByIdAndUpdate(
      id,
      { name, alcoholic, glass, ingredients, instructions, owner },
      { new: true }
    )
      .then(() => {
        res.redirect(`/users/my-cocktails/${id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  });

// route to delete cocktail
router.get("/my-cocktails/:id/delete", (req, res) => {
  const { id } = req.params;

  Cocktail.findByIdAndDelete(id).then(() => {
    res.redirect("/users/my-cocktails");
  });
});

// route to view user cocktail details
router.get("/my-cocktails/:id", (req, res) => {
  const { id } = req.params;
  Cocktail.findById(id)
    .populate("User")
    .then((cocktail) => {
      res.render("cocktails/user-cocktail", { cocktail });
    })
    .catch(console.log);
});

// route to add a new cocktail to the DB
router.get("/my-cocktails", (req, res) => {
  //Filter only currently user created cocktails:
  const { _id } = req.session.loggedInUser;
  Cocktail.find({ owner: _id })
    .then((cocktails) => {
      res.render("cocktails/my-cocktails", { cocktails });
    })
    .catch(console.log);
});

module.exports = router;