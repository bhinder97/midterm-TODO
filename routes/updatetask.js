const express = require('express');
const router  = express.Router();

let queryString = `
UPDATE tasks
SET task = $2,
    category = $3
WHERE tasks.id = $1;
`
//`SELECT * FROM quizzes WHERE quiz_id=${request};`
//Route "/home/updatetask"
module.exports = (db) => {
  router.get("/:id", (req, res) => {
    res.render("edit")
  })
  router.post("/:id", (req, res) => {
    db.query(queryString, [req.params, req.body.newTask, req.body.newCategory])
    .then(result => {
      console.log("TEST:", res.body)
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
