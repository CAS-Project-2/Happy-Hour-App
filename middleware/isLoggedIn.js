function isLoggedIn(req, res, next) {
  if (req.session.loggedInUser) {
    next();
  } else {
    res.redirect("/users/login");
  }
}

module.exports = isLoggedIn;