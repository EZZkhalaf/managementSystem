const express = require("express")
const { addDept, getDepts , getDept, editDepartment, deleteDepartment} = require("../Controllers/departmentController");
const verifyUser = require("../Middlewares/authMiddleware");

const router = express.Router();

router.post("/add" , verifyUser , addDept)
router.get("/" , verifyUser , getDepts)
router.get("/:id" , verifyUser , getDept)
router.put("/:id" , verifyUser , editDepartment)
router.delete("/:_id" , verifyUser , deleteDepartment)

module.exports = router