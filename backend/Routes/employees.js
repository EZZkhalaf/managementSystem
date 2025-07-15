const express = require("express");
const { addEmployee, upload, getEmployees, getEmployee } = require("../Controllers/exployeeController");
const verifyUser = require("../Middlewares/authMiddleware");


const router = express.Router() ;

router.post('/' , verifyUser, upload.single('image') ,addEmployee)
router.get('/' , verifyUser, getEmployees)
router.get('/:id' , verifyUser, getEmployee)

module.exports = router;