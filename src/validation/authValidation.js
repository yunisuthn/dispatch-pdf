import { check } from "express-validator";

let validateRegister = [
  check("email", "Invalid email").isEmail().trim(),

  check(
    "mot_de_passe",
    "Invalid password. Password must be at least 2 chars long"
  ).isLength({ min: 2 }),

  check(
    "passwordConfirmation",
    "Password confirmation does not match password"
  ).custom((value, { req }) => {
    return value === req.body.mot_de_passe;
  }),
];

module.exports = {
  validateRegister: validateRegister,
};
