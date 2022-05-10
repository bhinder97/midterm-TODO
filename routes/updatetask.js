const express = require('express');
const router  = express.Router();

let queryString = `
UPDATE tasks
SET $1 = $2
RETURNING *;
`
//`SELECT * FROM quizzes WHERE quiz_id=${request};`
//Route "/home/updatetask"
module.exports = (db) => {
  router.post("/:task", (req, res) => {
    db.query(queryString, [req.params, req.body.update])
    .then(result => {
      return res.redirect("/")
    })
    .catch(err => {
      res
      .status(500)
      .json({ error: err.message });
    });
  });
  return router;
};
