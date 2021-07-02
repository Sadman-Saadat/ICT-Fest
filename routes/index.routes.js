//jei folder e asi oita . diye lekha bette
const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    res.render("../views/welcome.ejs");       //base route
});

module.exports = router;

