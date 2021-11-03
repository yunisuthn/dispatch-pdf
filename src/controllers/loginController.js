let getLoginPage = (req, res) => {
  return res.render("login.ejs", {
    errors: req.flash("errors"),
  });
};

let checkLoggedOut = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  next();
};

let checkLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/login");
  }
  next();
};

let postLogOut = (req, res) => {
  req.session.destroy(function (err) {
    return res.redirect("/login");
  });
};

let getPlateforme = (req, res) => {
  return res.render("plateforme.ejs", {
    errors: req.flash("errors"),
  });
};

module.exports = {
  getLoginPage: getLoginPage,
  checkLoggedIn: checkLoggedIn,
  checkLoggedOut: checkLoggedOut,
  postLogOut: postLogOut,
  getPlateforme: getPlateforme,
};
