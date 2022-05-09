const express = require('express');
const router  = express.Router();

let queryString = `
SELECT task
FROM tasks
JOIN users ON users.id=users_id
WHERE users.id = $1;
`


// Route /home/viewall
module.exports = (db) => {
  console.log("viewall path test")
  router.get("/", (req, res) => {
    db.query(queryString, [1])
    .then(result => {
      return res.json(result.rows);
    })
    .then(() => {
      res.redirect("/")
    })
    .catch(err => {
      console.error(err)
      res
      .status(500)
      .json({ error: err.message });
    });
  });
  return router;
};
