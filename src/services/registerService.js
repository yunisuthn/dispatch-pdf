import connection from "../configs/DBConnection";
import bcryptjs from "bcryptjs";

let createNewUser = (user) => {
  return new Promise(async (resolve, reject) => {
    try {
      let check = await checkEmailUser(user.email);
      if (check) {
        console.log("mail already exist");
        reject(`this '${user.email}' has already exist`);
      } else {
        let salt = bcryptjs.genSaltSync(10);
        let data = {
          nom: user.nom,
          prenom: user.prenom,
          email: user.email,
          mot_de_passe: bcryptjs.hashSync(user.mot_de_passe, salt),
          is_admin: user.is_admin,
        };
        connection.query(
          "INSERT INTO users set ?",
          data,
          function (error, rows) {
            if (error) {
              reject(error);
            }
            console.log("creat successfully");
            resolve("Create a new user successfully");
          }
        );
      }
    } catch (e) {
      reject(e);
    }
  });
};

let checkEmailUser = (email) => {
  return new Promise((resolve, reject) => {
    try {
      connection.query(
        "SELECT * FROM users WHERE email= ?",
        email,
        function (error, rows) {
          if (error) {
            reject(error);
          }
          if (rows.length > 0) {
            resolve("true");
          } else {
            resolve(false);
          }
        }
      );
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  createNewUser: createNewUser,
};
