import passport from "passport";
import passportLocal from "passport-local";
import loginService from "../services/loginService";

let LocalStrategy = passportLocal.Strategy;

let initPassportLocal = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "mot_de_passe",
        passReqToCallback: true,
      },
      async (req, email, mot_de_passe, done) => {
        try {
          let user = await loginService.findUserByEmail(email);
          if (!user) {
            return done(
              null,
              false,
              req.flash("errors", `this user email "${email}" doesn't exist`)
            );
          }
          if (user) {
            let match = await loginService.comparePasswordUser(
              user,
              mot_de_passe
            );
            if (match === true) {
              return done(null, user, null);
            } else {
              return done(null, false, req.flash("errors", match));
            }
          }
        } catch (err) {
          return done(null, false, err);
        }
      }
    )
  );
};

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  obj.is_admin = obj.is_admin == "1" ? "1" : "0";
  done(null, obj);
});

module.exports = initPassportLocal;
