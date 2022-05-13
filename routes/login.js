const express = require('express');
const router  = express.Router();

let queryString = `
SELECT * FROM users
WHERE email = $1;
`

module.exports = (db) => {
  router.get("/", (req, res) => {
    req.session.user_id = 1;
    // db.query(`
    // SELECT * FROM users
    // WHERE id = $1;
    // `, [1])
    // .then ((result) => {
    //   const userObject = result.rows[0]
    //   const templateVars = {
    //     user: userObject
    //   }
      // res.render('index.ejs', templateVars)
      res.redirect("/")
    // })
  });
  router.post("/", (req, res) => {
    const userEmail = req.body.email;
    const userPass = req.body.password;
    db.query(queryString, [userEmail])
    .then(result => {
      // if (result !== "" && userPass === result.rows[0].password) {
      //   console.log("TEST :", result.rows[0].id);
        // req.session.user_id = result.rows[0].id;
      //   res.redirect("/");
      // } else {
      //   res.redirect("/login");
      // };
      if (result.rows.length.password < 1) {
        return res.send("incorrect info")
      }
      const userObject = result.rows[0]
      if (userObject.password !== userPass){
        return res.send("incorrect info")
      }
      req.session.user_id = result.rows[0].id;
      const templateVars = {
        user: userObject
      }
      // res.render('index.ejs', templateVars)
      res.redirect("/")
    });
  });
  return router;
};
