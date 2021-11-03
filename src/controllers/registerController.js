import { validationResult } from "express-validator";
import registerService from "../services/registerService";

let getRegisterPage = (req, res) => {
  if (req.user.is_admin == "1") {
    return res.render("register.ejs", {
      user: req.user,
      errors: req.flash("errors"),
    });
  } else if (req.user.is_admin == "0") {
    return res.render("plateforme.ejs", {
      user: req.user,
    });
  }
};

let createNewUser = async (req, res) => {
  let errorsArr = [];
  let validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    let errors = Object.values(validationErrors.mapped());
    errors.forEach((item) => {
      errorsArr.push(item.msg);
    });
    req.flash("errors", errorsArr);
    return res.redirect("/register");
  }

  let newUser = {
    nom: req.body.nom,
    prenom: req.body.prenom,
    email: req.body.email,
    mot_de_passe: req.body.mot_de_passe,
    is_admin: req.body.is_admin,
  };
  if (req.body.is_admin == undefined) {
    newUser.is_admin = false;
  } else {
    newUser.is_admin = true;
  }

  try {
    await registerService.createNewUser(newUser);
    return res.redirect(`/listeUser/${req.user.id}`);
  } catch (err) {
    req.flash("errors", err);
    return res.redirect("/register");
  }
};

module.exports = {
  getRegisterPage: getRegisterPage,
  createNewUser: createNewUser,
};
