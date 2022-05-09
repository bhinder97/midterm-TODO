const express = require('express');
const app = express();
const router  = express.Router();
const cookieSession = require('cookie-session');
app.use(cookieSession({
  name: 'session',
  keys: ['hello']
}));

// const getUserByEmail = function(email, database) {
//   for (let user of Object.values(database)) {
//     if (user.email === email) {
//       return true;
//     } else {
//       return false;
//     }
//   }
// };

// module.exports = () => {
//   router.post("/login", (req, res) => {
//     const getEmail = `SELECT * FROM users
//                       WHERE email = test@test.com;`
//     const userEmail = req.body.email;
//     if (getEmail === userEmail) {
//       res.redirect("/");
//     } else {
//       res.redirect("/login");
//     };
//   });
// };

module.exports = () => {
  router.get("/login", (req, res) => {
    res.render("login");
  });
};


let queryString = `
SELECT * FROM users
WHERE email = $1;
`

module.exports = (db) => {
  router.post("/login", (req, res) => {
    const userEmail = req.body.email;
    const userPass = req.body.password;
    db.query(queryString, [userEmail])
    .then(result => {
      if (result !== "" && userPass === result.rows[0].password) {
        req.session.user_id = result.rows[0].id;
        res.redirect("/");
      } else {
        res.redirect("/login");
      };
    });
  });
  return router;
};
