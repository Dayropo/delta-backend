const express = require("express")
const router = express.Router()

const user = require("./user.route")
const task = require("./task.route")

router.use("/user", user)
router.use("/task", task)

module.exports = router
