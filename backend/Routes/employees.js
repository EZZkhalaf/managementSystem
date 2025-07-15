const express = require("express");
const { addEmployee } = require("../Controllers/exployeeController");


const router = express.Router() ;

router.post('/' , addEmployee)

module.exports = router;