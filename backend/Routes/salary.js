const express = require("express");
const verifyUser = require("../Middlewares/authMiddleware");
const { addSalary, getEmployeeSalaries } = require("../Controllers/salaryControllers");


const router = express.Router() ;


router.post('/' , verifyUser, addSalary)
router.get('/:id' , verifyUser, getEmployeeSalaries)

module.exports = router;