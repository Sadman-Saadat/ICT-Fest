const express = require('express');
const router = express.Router();

const {
    ensureAuthenticated,
    addUserData
} = require("../middlewares/auth.middleware");

const {
    getMo,
    postMo,
    getMoList,
    deleteMo
} = require("../controllers/MathOlympiad.controller")

router.get('/register', ensureAuthenticated, addUserData, getMo);
router.post('/register', ensureAuthenticated, addUserData, postMo);
router.get('/list', ensureAuthenticated, addUserData, getMoList);
router.get('/delete/:id', ensureAuthenticated, addUserData, deleteMo);

module.exports = router;