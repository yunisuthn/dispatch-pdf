import express from "express";
import loginController from "../controllers/loginController";
import registerController from "../controllers/registerController";
import auth from "../validation/authValidation";
import passport from "passport";
import initPassportLocal from "../controllers/passportLocalController";
import homePageController from "../controllers/homePageController";
import controller from "../controllers/update-deleteUser";
import pdf_dispatch from "../controllers/dispatchController";

let router = express.Router();

initPassportLocal();

let initWebRoutes = (app) => {
  router.get(
    "/admin",
    loginController.checkLoggedIn,
    homePageController.getHomepage
  );

  router.get(
    "/",
    loginController.checkLoggedIn,
    homePageController.getPlateforme
  );

  router.get(
    "/login",
    loginController.checkLoggedOut,
    loginController.getLoginPage
  );

  router.post(
    "/login",
    passport.authenticate("local", {
      failureRedirect: "/login",
    }),
    (req, res) => {
      if (req.user.is_admin == "0") {
        res.redirect("/profile");
      }
      if (req.user.is_admin == "1") {
        res.redirect("/admin");
      }
    }
  );

  router.get(
    "/register",
    loginController.checkLoggedIn,
    registerController.getRegisterPage
  );

  router.post(
    "/register",
    loginController.checkLoggedIn,
    auth.validateRegister,
    registerController.createNewUser
  );

  router.get(
    "/listeUser/:idAdmin",
    loginController.checkLoggedIn,
    controller.liste
  );

  router.get(
    "/updateUser/:id/:idAdmin",
    loginController.checkLoggedIn,
    controller.getUser
  );

  //pdf_dispatch

  router.get("/selectPdf", pdf_dispatch.enregistrer_pdf);
  router.post("/api/upload", pdf_dispatch.apiUpload);
  router.get("/listePdf", pdf_dispatch.liste_pdf);
  router.post("/saveInfo/:filename", pdf_dispatch.saveInfo);
  router.get("/show", pdf_dispatch.show);
  router.get("/edit", pdf_dispatch.edit);
  router.get("/closeFile/:filename", pdf_dispatch.closeFile);
  router.get("/notfoundpage/:filename", pdf_dispatch.notfound);
  router.get("/edite/:filename", pdf_dispatch.editeFilename);
  router.get("/table", pdf_dispatch.table);
  router.get("/profile", pdf_dispatch.profile);
  router.get("/historique", pdf_dispatch.historique);

  //***fin pdf_dispatch */
  router.post("/updateUser/:id", controller.updateUser);

  router.post("/deleteUser/:id", controller.deleteUser);

  router.post("/logout", loginController.postLogOut);
  return app.use("/", router);
};

module.exports = initWebRoutes;
