const express = require("express");
const verifyUser = require("../Middlewares/authMiddleware");
const { addLeave, getEmployeeLeaves, getLeaves, getLeave, changeLeaveStatus } = require("../Controllers/leavesController");


const router = express.Router() ;


router.post('/add' , verifyUser, addLeave);
router.put('/:id' , verifyUser, changeLeaveStatus);
router.get('/:id' , verifyUser, getEmployeeLeaves);
router.get("/" , verifyUser , getLeaves)
router.get("/get-details/:id" , verifyUser , getLeave)



// router.post('/' , verifyUser, addSalary)
// router.get('/:id' , verifyUser, getEmployeeSalaries)

module.exports = router;