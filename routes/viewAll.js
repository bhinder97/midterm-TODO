const express = require('express');
const router  = express.Router();

let queryString = `
SELECT task
FROM tasks
JOIN users ON users.id=users_id
WHERE users.id = $1
GROUP BY task
ORDER BY task;
`


// Route /home/viewall
module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(queryString, [req.session.user_id])
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
