const express = require('express');
const router  = express.Router();

let queryString = `
DELETE FROM tasks
WHERE tasks.task = '$1'
RETURNING *;
`

//Route "/home/delete"
module.exports = (db) => {
  router.post("/", (req, res) => {
    db.query(queryString, [req.session.delete])
    .then(result => {
      return res.json(result.rows);
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
