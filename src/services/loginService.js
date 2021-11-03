import connection from "../configs/DBConnection";
import bcryptjs from "bcryptjs";

let findUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    try {
      connection.query(
        "SELECT * FROM users WHERE email = ?",
        email,
        function (error, rows) {
          if (error) {
            reject(error);
          }
          let user = rows[0];
          resolve(user);
        }
      );
    } catch (e) {
      reject(e);
    }
  });
};
let comparePasswordUser = (user, mot_de_passe) => {
  return new Promise(async (resolve, reject) => {
    try {
      let isMatch = await bcryptjs.compare(mot_de_passe, user.mot_de_passe);
      if (isMatch) resolve(true);
      resolve("The password that you entered is incorrect");
    } catch (error) {
      reject(error);
    }
  });
};

let findUserById = (id) => {
  return new Promise((resolve, reject) => {
    try {
      connection.query(
        "SELECT * FROM users WHERE id = ?",
        id,
        function (error, rows) {
          if (error) reject(error);
          let user = rows[0];
          resolve(user);
        }
      );
    } catch (error) {
      reject(error);
    }
  });
};

let isAdmin = (id) => {
  return new Promise((resolve, reject) => {
    try {
      connection.query(
        "SELECT * FROM users WHERE is_admin = ?",
        id,
        function (error, rows) {
          if (error) reject(error);
          let user = rows[0];
          resolve(user);
        }
      );
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  comparePasswordUser: comparePasswordUser,
  findUserByEmail: findUserByEmail,
  findUserById: findUserById,
  isAdmin: isAdmin,
};
