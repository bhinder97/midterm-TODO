const express = require('express');
const router  = express.Router();

let queryString = `
INSERT INTO tasks (users_id , task , category)
VALUES
($1, $2, $3)
RETURNING *;
`

module.exports = (db) => {
  router.post("/add", (req, res) => {
    db.query(queryString, [req.session.users_id, req.body.task, req.body.category])
      .then(result => {
        return result.rows;
      })
      .then(() => {
        res.redirect("/")
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
