//jei folder e asi oita . diye lekha bette
const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    res.send("<H1>Welcome!</H1>");       //base route
});

module.exports = router;

