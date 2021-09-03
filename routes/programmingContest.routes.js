const express = require("express");
const router = express.Router();

const { ensureAuthenticated, addUserData } = require("./../middlewares/auth.middleware");

const { getPC, postPC, getPCList, deletePC, selectPC, paymentDonePC, editPC, getInfoPC } = require('../controllers/ProgrammingContest.controller');

router.get("/register", ensureAuthenticated, addUserData, getPC);
router.post('/register', ensureAuthenticated, addUserData, postPC);
router.get('/list', ensureAuthenticated, addUserData, getPCList);
router.get('/delete/:id', ensureAuthenticated, addUserData, deletePC);
router.get('/select/:id', ensureAuthenticated, addUserData, selectPC);
router.get('/paymentDone/:id', ensureAuthenticated, addUserData, paymentDonePC);
router.get('/editParticipant/:id', ensureAuthenticated, addUserData, getInfoPC);
router.post('/editParticipant/:id', ensureAuthenticated, addUserData, editPC);

module.exports = router;