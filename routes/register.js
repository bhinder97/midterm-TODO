const express = require('express');
const router  = express.Router();

let queryString = `
INSERT INTO users (name, email, password)
VALUES
($1, $2, $3)
RETURNING *;
`

module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render("register");
  });
  router.post("/", (req, res) => {
    const userEmail = req.body.email;
    const userName = req.body.name;
    const userPass = req.body.password;
    db.query(queryString, [userName, userEmail, userPass])
    .then(result => {
      req.session.user_id = result.rows[0].id;
      res.redirect("/");
    })
    .catch(err => {
      res
      .status(500)
      .json({ error: err.message });
    });
  });
  return router;
};
