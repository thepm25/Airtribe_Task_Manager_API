const Task = require('../models/task');
const taskValidator = require('../validators/taskValidator');
const sendResponse = require('../utils/response');
let tasks = require('../task.json');
const TaskSorter = require('../utils/taskSorter')
const {priority} = require('../models/priority')

// Get all tasks
const getAllTasks = (req, res) => {
    const sortedTasks = TaskSorter.sortByCreatedAtDesc(tasks);
  sendResponse(res, 200, tasks);
};

// Get a task by ID
const getTaskById = (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find((t) => t.id === taskId);

  if (!task) {
    sendResponse(res, 404, { message: 'Task not found' });
    return;
  }

  sendResponse(res, 200, task);
};

// Create a new task
const createTask = (req, res) => {
  const { error } = taskValidator(req.body);

  if (error) {
    sendResponse(res, 400, { message: error.details[0].message });
    return;
  }

  const newTask = new Task(
    tasks.length + 1,
    req.body.title,
    req.body.description,
    req.body.completed,
    req.body.priority
  );

  tasks.push(newTask);
  const sortedTasks = TaskSorter.sortByPriority(tasks, Object.values(Priority));
  sendResponse(res, 201, newTask);
};

// Update a task by ID
const updateTask = (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find((t) => t.id === taskId);

  if (!task) {
    sendResponse(res, 404, { message: 'Task not found' });
    return;
  }

  const { error } = taskValidator(req.body);

  if (error) {
    sendResponse(res, 400, { message: error.details[0].message });
    return;
  }

  task.title = req.body.title;
  task.description = req.body.description;
  task.completed = req.body.completed;
  task.priority = req.body.priority;

  sendResponse(res, 200, task);
};

// Delete a task by ID
const deleteTask = (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex((t) => t.id === taskId);

  if (taskIndex === -1) {
    sendResponse(res, 404, { message: 'Task not found' });
    return;
  }

  tasks.splice(taskIndex, 1);
  sendResponse(res, 200, { message: 'Task deleted' });
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
