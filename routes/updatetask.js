const express = require('express');
const router  = express.Router();

let queryString = `
UPDATE tasks
SET tasks.task = $1
RETURNING *;
`

module.exports = (db) => {
  router.post("/update", (req, res) => {
    db.query(queryString, [req.body.update])
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
