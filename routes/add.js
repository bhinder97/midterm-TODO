const express = require('express');
const router  = express.Router();
const request = require('request');

const getCategory = function(action) {
  let category = "Uncategorized";
  return request(`https://www.googleapis.com/books/v1/volumes?q=${action}`, (error, response, body) => {
    let data = JSON.parse(body)
    console.log("action test:", action)
    console.log("TESTdata:", data.items[0].volumeInfo.readingModes)
    if (data.items[0].volumeInfo.readingModes.text === true) {
    category = "To read";
    }
  })

};


let queryString = `
INSERT INTO tasks (users_id , task , category)
VALUES
($1, $2, $3)
RETURNING *;
`
// Route /home/add
module.exports = (db) => {
  router.post("/", (req, res) => {
    cat = getCategory(req.body.task)
    console.log(req.body)
    db.query(queryString, [req.session.user_id, req.body.task, cat])
      .then(result => {
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
