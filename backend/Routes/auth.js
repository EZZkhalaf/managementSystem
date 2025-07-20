const express = require("express")
const {login , register, verify , getSummary}  = require("../Controllers/authController");
const verifyUser = require("../Middlewares/authMiddleware");
const router = express.Router();


router.post('/login' , login)

router.post('/register' , register)

router.get('/verify' , verifyUser , verify)

router.get('/summary' , verifyUser , getSummary)

module.exports = router