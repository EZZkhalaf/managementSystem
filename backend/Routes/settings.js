const express = require("express");
const verifyUser = require("../Middlewares/authMiddleware");
const { changePassword } = require("../Controllers/settingsController");


const router = express.Router() ;


router.post('/change-password' , verifyUser, changePassword)


module.exports = router;