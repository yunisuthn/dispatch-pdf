let getHomepage = (req, res) => {
  if (req.user.is_admin == "1") {
    return res.render("homepage.ejs", {
      user: req.user,
    });
  } else if (req.user.is_admin == "0") {
    return res.render("plateforme.ejs", {
      user: req.user,
    });
  }
};

let getPlateforme = (req, res) => {
  return res.render("plateforme.ejs", {
    user: req.user,
  });
};

module.exports = {
  getHomepage: getHomepage,
  getPlateforme: getPlateforme,
};
