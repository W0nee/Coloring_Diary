const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
  // res.render("main", { user: req.user });
  res.render("main");
});

module.exports = router;
