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
    console.log("TEST@!#@#!:", req.session.users_id);
    console.log("TEST ADD@!#@#!:", req.body.add);
    let category = "Uncategorized"
    request(`https://www.googleapis.com/books/v1/volumes?q=${req.body.add}`, (error, response, body) => {
        let data = JSON.parse(body);
        if (data.items[0].volumeInfo.readingModes.text === true) {
          console.log("Test 1:", data.items[0].volumeInfo.readingModes.text)
          category = "Books (To read)";
        } else {
          request(`http://www.omdbapi.com/?t=${req.body.add}&apikey=23375eca`, (error, response, body) => {
            let data = JSON.parse(body);
            if (data.Year !== undefined) {
              console.log("Test 2:", data.Year)
              category = "Film / Series (To watch)";
            } else {
              request(`https://www.themealdb.com/api/json/v1/1/search.php?s=${req.body.add}`, (error, response, body) => {
                let data = JSON.parse(body);
                if (data.meals !== null) {
                  console.log("Test 3:", data.meals)
                  category = "Foods (To eat)";
                } else {
                  category = "Products (To buy)";
                  db.query(queryString, [1, req.body.add, category])
                  .then((result) => {
                    // console.log("TEST@!#@#!:", req.body);
                    return res.redirect("/");
                  })
                  .catch((err) => {
                    console.log(err);
                    res.status(500).json({ error: err.message });
                  });
                }
              });
            }
          });
        }
      }
    );
  });
  return router;
};
