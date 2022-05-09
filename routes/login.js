const express = require('express');
const router  = express.Router();

let queryString = `
SELECT * FROM users
WHERE email = $1;
`

module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render("login");
  });
  router.post("/", (req, res) => {
    const userEmail = req.body.email;
    const userPass = req.body.password;
    db.query(queryString, [userEmail])
    .then(result => {
      if (result !== "" && userPass === result.rows[0].password) {
        console.log("TEST :", result.rows[0].id);
        req.session.user_id = result.rows[0].id;
        res.redirect("/");
      } else {
        res.redirect("/login");
      };
    });
  });
  return router;
};
