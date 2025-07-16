const express = require("express");
const verifyUser = require("../Middlewares/authMiddleware");
const { addSalary } = require("../Controllers/salaryControllers");


const router = express.Router() ;


router.post('/' , verifyUser, addSalary)

module.exports = router;