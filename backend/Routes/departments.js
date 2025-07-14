const express = require("express")
const { addDept, getDepts } = require("../Controllers/departmentController");
const verifyUser = require("../Middlewares/authMiddleware");

const router = express.Router();

router.post("/add" , verifyUser , addDept)
router.get("/" , verifyUser , getDepts)

module.exports = router