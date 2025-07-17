const express = require("express");
const verifyUser = require("../Middlewares/authMiddleware");
const { addLeave } = require("../Controllers/leavesController");


const router = express.Router() ;


router.post('/add' , verifyUser, addLeave);


// router.post('/' , verifyUser, addSalary)
// router.get('/:id' , verifyUser, getEmployeeSalaries)

module.exports = router;