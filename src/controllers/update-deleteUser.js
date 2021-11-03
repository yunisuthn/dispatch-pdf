const conn = require("../configs/DBConnection");

let liste = (req, res) => {
  conn.query(
    `SELECT * FROM users WHERE id = "${req.params.idAdmin}" ; SELECT * FROM users`,
    [1, 2],
    (err, results) => {
      if (err) throw err;
      if (results[0][0].is_admin == "1") {
        res.render("liste.ejs", { admin: results[0][0], users: results[1] });
      } else if (results[0][0].is_admin == "0") {
        res.render("plateforme.ejs", { users: results[0][0] });
      }
    }
  );
};

let getUser = (req, res) => {
  conn.query(
    `SELECT * FROM users WHERE id = "${req.params.idAdmin}" ; SELECT id, nom, prenom, email, mot_de_passe FROM users WHERE id="${req.params.id}"`,
    [1, 2],
    (err, results) => {
      if (err) throw err;
      if (results[0][0].is_admin == "1") {
        res.render("edit.ejs", { user: results[1][0] });
      } else if (results[0][0].is_admin == "0") {
        res.render("plateforme.ejs", { users: results[0][0] });
      }
    }
  );
};

let updateUser = (req, res) => {
  const { nom, prenom, email, mot_de_passe, is_admin } = req.body;
  let sql = `UPDATE users SET nom='${nom}', prenom='${prenom}',email='${email}', mot_de_passe='${mot_de_passe}',is_admin='${is_admin}' WHERE id = ? `;
  conn.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    console.log("successfully update");
    res.redirect(`/listeUser/${req.user.id}`);
  });
};

let deleteUser = (req, res) => {
  let sql = `DELETE FROM users WHERE id = ?`;
  conn.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    console.log("successfully deleted");
    res.redirect(`/listeUser/${req.user.id}`);
  });
};

module.exports = {
  liste: liste,
  getUser: getUser,
  updateUser: updateUser,
  deleteUser: deleteUser,
};
