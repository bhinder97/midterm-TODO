const express = require("express");
const router = express.Router();
const request = require("request");

// const getCategory = function (action) {
//   let category = "Uncategorized";
//   return request(
//     `https://www.googleapis.com/books/v1/volumes?q=${action}`,
//     (error, response, body) => {
//       let data = JSON.parse(body);
//       console.log("action test:", action);
//       console.log("TESTdata:", data.items[0].volumeInfo.readingModes);
//       if (data.items[0].volumeInfo.readingModes.text === true) {
//         category = "To read";
//         return category;
//       }
//     }
//   );
// };

let queryString = `
INSERT INTO tasks (users_id , task , category)
VALUES
($1, $2, $3)
RETURNING *;
`;

// Route /home/add
module.exports = (db) => {
  router.post("/", (req, res) => {
    let category = "Uncategorized"
    request(`https://www.googleapis.com/books/v1/volumes?q=${req.body.task}`, (error, response, body) => {
        let data = JSON.parse(body);
        if (data.items[0].volumeInfo.readingModes.text === true) {
          category = "To read";
        } else {
          request(`https://www.googleapis.com/books/v1/volumes?q=${req.body.task}`, (error, response, body) => {
            let data = JSON.parse(body);
            if (data.items[0].volumeInfo.readingModes.text === true) {
              category = "To buy";
            }
          });
        }
        db.query(queryString, [req.body.users_id, req.body.task, category])
          .then((result) => {
            console.log(result);
            res.redirect("/");
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({ error: err.message });
          });
      }
    );
  });
  return router;
};
