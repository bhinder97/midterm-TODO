// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");


// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
const cookieSession = require('cookie-session');
app.use(cookieSession({
  name: 'session',
  keys: ['hello']
}));

app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

app.use(express.static("public"));

app.use(express.json())

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const widgetsRoutes = require("./routes/widgets");
const addRoute = require("./routes/add");
const viewRoute = require("./routes/viewAll");
const updateRoute = require("./routes/updatetask");
const deleteroute = require("./routes/delete");
const login = require("./routes/login");
const register = require("./routes/register");


// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/widgets", widgetsRoutes(db));
app.use("/add", addRoute(db));
app.use("/viewall", viewRoute(db));
app.use("/updatetask", updateRoute(db));
app.use("/delete", deleteroute(db));
app.use("/login", login(db));
app.use("/register", register(db));

// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/", (req, res) => {
  let queryString = `
  SELECT tasks.*
  FROM tasks
  JOIN users ON users.id=users_id
  WHERE users.id = $1;
  `
  const templateVars = {
    user: null,
    allTasks: null
  }
  if(req.session.user_id){
    const firstQuery = db.query(queryString, [req.session.user_id])
    const secondQuery = db.query(`SELECT * FROM users
    WHERE id = $1;`, [req.session.user_id])
    Promise.all([firstQuery, secondQuery])
    .then((result) => {
      // console.log("TEST!!:", result[0].rows)
      templateVars.allTasks = result[0].rows;
      templateVars.user = result[1].rows[0]
      // console.log("TEST!!:", templateVars)
      return res.render("index", templateVars);
    })
  } else {
    res.render("index", templateVars);
  }
});

app.get("/edit", (req, res) => {
  res.render("edit");
});

app.get("/logout", (req, res) => {
  req.session = null;
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

app.get("/edit", (req, res) => {
  res.render("edit");
});
