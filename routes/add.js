const express = require('express');
const router  = express.Router();

let queryString = `
INSERT INTO tasks (users_id , task , category)
VALUES
($1, $2, $3)
RETURNING *;
`
// Route /home/add
module.exports = (db) => {
  router.post("/", (req, res) => {
    console.log(req.body)
    db.query(queryString, [req.session.user_id, req.body.task, req.body.category])
      .then(result => {
        return res.json(result.rows);
      })
      .then(() => {
        res.redirect("/")
      })
      .catch(err => {
        console.log(err)
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
