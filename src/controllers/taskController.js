const Task = require('../../models/task');
const taskValidator = require('../validators/taskValidator');
const sendResponse = require('../utils/response');
const TaskSorter = require('../utils/taskSorter')
const TaskHelper = require('../helpers/taskHelper');
const {priority} = require('../enums/priority')
const logger = require('../logger');
const { NotFoundError, ValidationError } = require('../exceptions/customErrors');
let tasks = require('../../models/task.json');

// Get all tasks
const getAllTasks = (req, res) => {
    try{
        const {completed, sort} = req.query;
        let filteredTasks = tasks;

        if(completed != undefined && sort != undefined){
            logger.info('Query Params: Completion Status: ', completed, ' sort: ', sort);
        }
        
        filteredTasks = TaskHelper.filterTasksByCompletion(filteredTasks, completed);
        filteredTasks = TaskHelper.sortTasksByCreatedAt(filteredTasks, sort);

        const sortedTasks = TaskSorter.sortByCreatedAtDesc(filteredTasks);
        sendResponse(res, 200, sortedTasks);
    }
    catch(error){
        next(error);
    }
};

// Get a task by ID
const getTaskById = (req, res) => {
    try{
        const taskId = parseInt(req.params.id);
        const task = tasks.find((t) => t.id === taskId);

        if (!task) {
            logger.info('Task with Task ID: ', taskId," not found");
            throw new NotFoundError('Task with Task ID: ', taskId,' not found')
        }
        logger.info('Task: ', task, ' with Task Id: ', taskId, " retrieved successfully");
        sendResponse(res, 200, task);
    }
    catch(error){
        next(error);
    }
};

// Create a new task
const createTask = (req, res) => {
    try{
        const { error } = taskValidator(req.body);

        if (error) {
            logger.error('Invalid Task Creation Request', error.details[0].message);
            throw new ValidationError(error.details[0].message);
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
    }
    catch(error){
        next(error);
    }
};

// Update a task by ID
const updateTask = (req, res) => {
    try{
        const taskId = parseInt(req.params.id);
        const task = tasks.find((t) => t.id === taskId);

        if (!task) {
            logger.info('Task with Task ID: ', taskId," not found") 
            throw new NotFoundError('Task with Task ID: ', taskId,' not found')
        }

        const { error } = taskValidator(req.body);

        if (error) {
            logger.error('Error Occured - '. error);
            throw new ValidationError(error.details[0].message);
        }

        task.title = req.body.title;
        task.description = req.body.description;
        task.completed = req.body.completed;
        task.priority = req.body.priority;

        logger.info('Task Updated Successfully. Task Id- ', taskId, ';Updated Task- ', task);
        sendResponse(res, 200, task);
    }
    catch(error){
        next(error);
    }
};

// Delete a task by ID
const deleteTask = (req, res) => {
    try{
        const taskId = parseInt(req.params.id);
        const taskIndex = tasks.findIndex((t) => t.id === taskId);

        if (taskIndex === -1) {
            logger.info('Task with Task ID: ', taskId," not found") 
            throw new NotFoundError('Task with Task ID: ', taskId,' not found')
        }

        tasks.splice(taskIndex, 1);
        sendResponse(res, 200, { message: 'Task deleted' });
    }
    catch(error){
        next(error);
    }
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
