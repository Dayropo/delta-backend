const {
  createTask,
  getAllTasks,
  editTask,
  changeTaskStatus,
  deleteTask,
} = require("../services/task.services")
const { CreatedResponse, SuccessResponse } = require("../utilities/core/ApiResponse")
const exec = require("../utilities/core/catchAsync")

/**
 * @description A method to handle creating a task
 * @param req - The request object representing the HTTP request
 * @param res - The response object representing the HTTP response
 * @returns {*}
 */
exports.createTask = exec(async (req, res) => {
  /**
   * @description Extracting the data from the request body
   */
  const data = req.body
  const cookie = req.cookies.jwt

  /**
   * @description Calling the createTask service to handle the task creation process
   */
  const response = await createTask(data, cookie)

  /**
   * @description Returning a success response with the created task data
   */
  new CreatedResponse("Task created successfully", response).send(res)
})

/**
 * @description A method to handle getting all tasks
 * @param req - The request object representing the HTTP request
 * @param res - The response object representing the HTTP response
 * @returns {*}
 */
exports.getAllTasks = exec(async (req, res) => {
  const cookie = req.cookies.jwt

  /**
   * @description Calling the getAllTasks service to handle the task fetching process
   */
  const response = await getAllTasks(cookie)

  /**
   * @description Returning a success response with the fetched tasks data
   */
  new SuccessResponse("Tasks fetched successfully", response).send(res)
})

/**
 * @description A method to handle editing a task
 * @param req - The request object representing the HTTP request
 * @param res - The response object representing the HTTP response
 * @returns {*}
 */
exports.editTask = exec(async (req, res) => {
  /**
   * @description Extracting the data from the request body
   */
  const { id } = req.params
  const data = req.body
  const cookie = req.cookies.jwt

  /**
   * @description Calling the editTask service to handle the task editing process
   */
  const response = await editTask(id, data, cookie)

  /**
   * @description Returning a success response with the edited task data
   */
  new SuccessResponse("Task updated successfully", response).send(res)
})

/**
 * @description A method to handle changing the status of a task
 * @param req - The request object representing the HTTP request
 * @param res - The response object representing the HTTP response
 * @returns {*}
 */
exports.changeTaskStatus = exec(async (req, res) => {
  /**
   * @description Extracting the data from the request body
   */
  const { id } = req.params
  const data = req.body
  const cookie = req.cookies.jwt

  /**
   * @description Calling the changeTaskStatus service to handle the task status update process
   */
  const response = await changeTaskStatus(id, data, cookie)

  /**
   * @description Returning a success response with the edited task data
   */
  new SuccessResponse("Task updated successfully", response).send(res)
})

/**
 * @description A method to handle deleting a task
 * @param req - The request object representing the HTTP request
 * @param res - The response object representing the HTTP response
 * @returns {*}
 */
exports.deleteTask = exec(async (req, res) => {
  /**
   * @description Extracting the data from the request body
   */
  const { id } = req.params
  const cookie = req.cookies.jwt

  /**
   * @description Calling the deleteTask service to handle the task deletion process
   */
  const response = await deleteTask(id, cookie)

  /**
   * @description Returning a success response with the deleted task data
   */
  new SuccessResponse("Task deleted successfully", response).send(res)
})
