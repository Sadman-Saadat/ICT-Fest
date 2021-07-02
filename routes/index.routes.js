//jei folder e asi oita . diye lekha bette
const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    res.render("../views/users/register-v2.ejs");       //base route
});

module.exports = router;

