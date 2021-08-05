//jei folder e asi oita . diye lekha bette
const express = require('express');
const router = express.Router();
const { ensureAuthenticated, addUserData } = require("./../middlewares/auth.middleware");

router.get("/", (req, res) => {
  res.render("../views/welcome.ejs");       //base route
});

router.get("/dashboard", ensureAuthenticated, addUserData, (req, res) => {
  res.render("../views/dashboard.ejs", { user: req.user });
});

module.exports = router;

