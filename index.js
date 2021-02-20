const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const mongoose = require("mongoose");
const app = express();

// DB Setting
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);
mongoose.connect("mongodb+srv://park:park123@cluster0.4bvqg.mongodb.net/coloring_diary?retryWrites=true&w=majority");
// mongoose.connect("process.env.MONGO_DB");

let db = mongoose.connection;
db.once("open", () => {
  console.log("DB Connected");
});
db.on("error", (err) => {
  console.log("DB Error : ", err);
});

// Login Setting
app.use(session({ secret: "MySecret", resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// Other Setting
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.currentUser = req.user;
  next();
});

// Routes
app.use("/", require("./routes/main"));
app.use("/users", require("./routes/users"));
app.use("/diary", require("./routes/diary"));

const port = 5000;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

app.get("/test", (req, res) => {
  res.render("test_view");
});
