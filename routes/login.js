const express = require('express');
const router  = express.Router();

// const getUserByEmail = function(email, database) {
//   for (let user of Object.values(database)) {
//     if (user.email === email) {
//       return true;
//     } else {
//       return false;
//     }
//   }
// };

module.exports = (db) => {
  router.get("/login", (req, res) => {
    res.render("login");
  });
};

module.exports = (db) => {
  router.post("/login", (req, res) => {
    const getEmail = `SELECT * FROM users
                      WHERE email = test@test.com`
    const userEmail = req.body.email;
    if (getEmail === userEmail) {
      res.redirect("/");
    } else {
      res.redirect("/login");
    }
  })
}
