const express = require('express');
const router  = express.Router();

let queryString = `
UPDATE tasks
SET tasks.task = $1
RETURNING *;
`
//`SELECT * FROM quizzes WHERE quiz_id=${request};`
//Route "/home/updatetask"
module.exports = (db) => {
  router.post("/", (req, res) => {
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
