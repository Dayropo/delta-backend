const Task = require("../models/Task")
const User = require("../models/User")
const { AuthFailureError, InternalError } = require("../utilities/core/ApiError")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")

dotenv.config()

async function createTask(data, cookie) {
  const claims = jwt.verify(cookie, process.env.JWT_SECRET)

  if (!claims) throw new AuthFailureError("Invalid token")

  const user = await User.findOne({ _id: claims._id })
  const { _id } = await user.toJSON()

  if (!user) throw new AuthFailureError("User does not exist!")

  const task = new Task({
    ...data,
    status: "ongoing",
    user: _id,
  })

  const result = await task.save()

  if (result) {
    return result.toJSON()
  } else {
    throw new InternalError("An error occurred while creating your task. Please try again later!")
  }
}

async function getAllTasks(cookie) {
  const claims = jwt.verify(cookie, process.env.JWT_SECRET)

  if (!claims) throw new AuthFailureError("Invalid token")

  const user = await User.findOne({ _id: claims._id })
  const { _id } = await user.toJSON()

  if (!user) throw new AuthFailureError("User does not exist!")

  const tasks = await Task.find({ user: _id }).sort({ createdAt: -1 })

  if (!tasks)
    throw new InternalError("An error occurred while fetching tasks. Please try again later!")

  return tasks
}

async function editTask(id, data, cookie) {
  const claims = jwt.verify(cookie, process.env.JWT_SECRET)

  if (!claims) throw new AuthFailureError("Invalid token")

  const user = await User.findOne({ _id: claims._id })
  const { _id } = await user.toJSON()

  if (!user) throw new AuthFailureError("User does not exist!")

  const task = await Task.findOneAndUpdate({ _id: id, user: _id }, data, { new: true })

  if (!task) throw new InternalError("An error occurred while updating the task!")

  return task
}

async function changeTaskStatus(id, data, cookie) {
  const claims = jwt.verify(cookie, process.env.JWT_SECRET)

  if (!claims) throw new AuthFailureError("Invalid token")

  const user = await User.findOne({ _id: claims._id })
  const { _id } = await user.toJSON()

  if (!user) throw new AuthFailureError("User does not exist!")

  const task = await Task.findOneAndUpdate({ _id: id, user: _id }, data, { new: true })

  if (!task) throw new InternalError("An error occurred while updating the task!")

  return task
}

async function deleteTask(id, cookie) {
  const claims = jwt.verify(cookie, process.env.JWT_SECRET)

  if (!claims) throw new AuthFailureError("Invalid token")

  const user = await User.findOne({ _id: claims._id })
  const { _id } = await user.toJSON()

  if (!user) throw new AuthFailureError("User does not exist!")

  const task = await Task.findOneAndDelete({ _id: id, user: _id })

  if (!task) throw new InternalError("An error occurred while deleting the task!")

  return task
}

module.exports = {
  createTask,
  getAllTasks,
  editTask,
  changeTaskStatus,
  deleteTask,
}
