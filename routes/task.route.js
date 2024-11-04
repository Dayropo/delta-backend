const express = require("express")
const { verifyToken } = require("../middleware/verifyToken")
const {
  createTask,
  getAllTasks,
  editTask,
  changeTaskStatus,
  deleteTask,
} = require("../controllers/task.controller")
const router = express.Router()

router.post("/create", verifyToken, createTask)
router.get("/", verifyToken, getAllTasks)
router.put("/:id", verifyToken, editTask)
router.put("/status/:id", verifyToken, changeTaskStatus)
router.delete("/:id", verifyToken, deleteTask)

module.exports = router
