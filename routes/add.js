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

const runDB = function (db, queryString, req, res, category) {
  db.query(queryString, [req.session.user_id, req.body.add, category])
    .then((result) => {
      return res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err.message });
    });
};

// Route /home/add
module.exports = (db) => {
  router.post("/", (req, res) => {
    // console.log("TEST@!#@#!:", req.session.user_id);
    // console.log("TEST ADD@!#@#!:", req.body.add);
    let category = "Uncategorized";
    request(
      `https://api.spoonacular.com/food/ingredients/search?apiKey=e4890b39a51e4455ad4dc16f73000788&query=${req.body.add}`,
      (error, response, body) => {
        let data = JSON.parse(body);
        if (data.totalResults !== 0) {
          // console.log("Test 3:", data.meals);
          category = "Foods (To eat)";
          runDB(db, queryString, req, res, category);
        } else {
          request(
            `https://www.googleapis.com/books/v1/volumes?q=${req.body.add}`,
            (error, response, body) => {
              let data = JSON.parse(body);
              if (data.items[0].volumeInfo.readingModes.text === true) {
                // console.log(
                //   "Test 1:",
                //   data.items[0].volumeInfo.readingModes.text
                // );
                category = "Books (To read)";
                runDB(db, queryString, req, res, category);
              } else {
                request(
                  `http://www.omdbapi.com/?t=${req.body.add}&apikey=23375eca`,
                  (error, response, body) => {
                    let data = JSON.parse(body);
                    if (data.Year !== undefined) {
                      // console.log("Test 2:", data.Year);
                      category = "Film / Series (To watch)";
                      runDB(db, queryString, req, res, category);
                    } else {
                      category = "Products (To buy)";
                      runDB(db, queryString, req, res, category);
                    }
                  }
                );
              }
            }
          );
        }
        //   db.query(queryString, [req.session.users_id, req.body.add, category])
        //   .then((result) => {
        //     // console.log("TEST@!#@#!:", req.body);
        //     return res.redirect("/");
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //     res.status(500).json({ error: err.message });
        // });
      }
    );
  });
  return router;
};
