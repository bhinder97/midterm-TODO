const express = require('express');
const router  = express.Router();

let queryString = `
SELECT task, category
FROM tasks
JOIN users ON users.id=users_id
WHERE users.id = $1
GROUP BY task, category
ORDER BY task;
`


// Route /home/viewall
module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(queryString, [req.session.user_id])
    .then(result => {
      rows = result.rows;
      const templateVars = {
        allTasks: rows
      }
      res.render('index.ejs', templateVars)
      // return res.json(result.rows);
    })
    .catch(err => {
      res
      .status(500)
      .json({ error: err.message });
    });
  });
  return router;
};
