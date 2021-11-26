const express = require("express");
const res = require("express/lib/response");
const async = require("hbs/lib/async");
const api = require("../apis/api");

const router = express.Router();

const Cocktail = require("../models/Cocktail.model");

const cocktailAPI = require("../apis/api");

// filter by ingredient

router.get("/liquor", (req, res) => {
  res.render("cocktails/liquor");
});

// filter by ingredient

router.get("/liquor/:alcohol", (req, res) => {
  const { alcohol } = req.params;

  cocktailAPI
    .getByLiquor(alcohol)
    .then((apiResponse) => {
      res.render("cocktails/filtered-liquor", {
        cocktails: apiResponse.data.drinks,
        alcohol: alcohol.replace("_", " "),
      });
    })
    .catch(console.log);
});

// filter by fruity-liquors

router.get("/fruity", (req, res) => {
  const { alcohol } = req.params;

  cocktailAPI
    .getByLiquor(alcohol)
    .then((apiResponse) => {
      res.render("cocktails/fruity-list", {
        cocktails: apiResponse.data.drinks,
        alcohol,
      });
    })
    .catch(console.log);
});

// filter by coffee-liquors

router.get("/coffee", (req, res) => {
  const { alcohol } = req.params;

  cocktailAPI
    .getByLiquor(alcohol)
    .then((apiResponse) => {
  
      res.render("cocktails/coffee-list", {
        cocktails: apiResponse.data.drinks,
        alcohol,
      });
    })
    .catch(console.log);
});

// filter by whiskies

router.get("/whiskies", (req, res) => {
  const { alcohol } = req.params;
  cocktailAPI
    .getByLiquor(alcohol)
    .then((apiResponse) => {
      res.render("cocktails/whiskies-list", {
        cocktails: apiResponse.data.drinks,
        alcohol,
      });
    })
    .catch(console.log);
});

// filter by rums

router.get("/rums", (req, res) => {
  const { alcohol } = req.params;
  cocktailAPI
    .getByLiquor(alcohol)
    .then((apiResponse) => {
      res.render("cocktails/rums-list", {
        cocktails: apiResponse.data.drinks,
        alcohol,
      });
    })
    .catch(console.log);
});

// main page filter
router.get("/", (req, res) => res.render("cocktails/filters"));

// filter alphabetically

router.get("/alphabet", (req, res) => res.render("cocktails/alphabet-order", {letterArray: "ABCDEFGHIJKLMNOPQRSTVWYZ".split('')}));

// alphabetic filter for each letter
router.get("/alphabet/:letter", (req, res) => {
  const { letter } = req.params;
  cocktailAPI
    .getByLetter(letter)
    .then((apiResponse) => {
      res.render("cocktails/cocktail-list", {
        cocktails: apiResponse.data.drinks,
      });
    })
    .catch(console.log);
});

// filter by glass list
router.get("/glasses", (req, res) => {
  cocktailAPI
    .getGlassList()
    .then((apiResponse) => {
      res.render("cocktails/glass-list", { glasses: apiResponse.data.drinks });
    })
    .catch(console.log);
});

// filter by glass
router.get("/glasses/:glass", (req, res) => {
  const { glass } = req.params;

  cocktailAPI
    .filterByGlass(glass)
    .then((apiResponse) => {
      res.render("cocktails/cocktailsByGlass", {
        glasses: apiResponse.data.drinks,
        glass,
      });
    })
    .catch(console.log);
});

// filter by non-alcoholic
router.get("/non-alcoholic", (req, res) => {
  cocktailAPI
    .getByNonAlcoholic()
    .then((apiResponse) => {
      res.render("cocktails/cocktail-list", {
        cocktails: apiResponse.data.drinks,
      });
    })
    .catch(console.log);
});
router.get("/community/:id/delete", (req, res) => {
  const { id } = req.params;
  Cocktail.findByIdAndDelete(id).then(() => {
    res.redirect("/cocktail/community");
  });
});

router
  .route("/community/:id/edit")
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
        res.redirect(`/cocktail/community`);
      })
      .catch((err) => {
        console.log(err);
      });
  });

router.get("/community/:id", (req, res) => {
  const { id } = req.params;
  Cocktail.findById(id)
    .populate("User")
    .then((cocktail) => {
      if (req.session.loggedInUser._id == cocktail.owner) {
        console.log(req.session.loggedInUser._id, cocktail.owner);
        var showButtons = true;
        
      }
      res.render("cocktails/community-cocktail-details", {
        cocktail,
        showButtons
      });
    });
});
router.get("/community", (req, res) => {

  if (req.session.loggedInUser) {
    Cocktail.find().then((cocktails) => {
      res.render("cocktails/community-cocktails", { cocktails });
    });
  } else {
    res.render("login");
  }

});

//GET RANDOM COCKTAIL
router.get("/random", (req, res) => {
  cocktailAPI
    .getRandom()
    .then((apiResponse) => {
      res.render("cocktails/random-cocktail", {
        cocktail: apiResponse.data.drinks[0],
      });
    })
    .catch(console.log);
});

// find by ID to see cocktail details
router.get("/:id", (req, res) => {
  const { id } = req.params;

  cocktailAPI
    .getById(id)
    .then((cocktail) => {
      res.render("cocktails/cocktail-details", {
        cocktail
      });
    })
    .catch(console.log);
});

module.exports = router;
