const Task = require('../../models/task');
const taskValidator = require('../validators/taskValidator');
const sendResponse = require('../utils/response');
const TaskSorter = require('../utils/taskSorter')
const TaskHelper = require('../helpers/taskHelper');
const {priority} = require('../enums/priority')
let tasks = require('../../models/task.json');
const logger = require('../logger');

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
        logger.error('Error Getting Tasks:', error);
        sendResponse(res, 500, {message: 'Internal Server Error'});
    }
};

// Get a task by ID
const getTaskById = (req, res) => {
    try{
        const taskId = parseInt(req.params.id);
        const task = tasks.find((t) => t.id === taskId);

        if (!task) {
            logger.info('Task with Task ID: ', taskId," not found");
            sendResponse(res, 404, { message: 'Task not found' });
            return;
        }
        logger.info('Task: ', task, ' with Task Id: ', taskId, " retrieved successfully");
        sendResponse(res, 200, task);
    }
    catch(error){
        logger.error('Error Getting Tasks:', error);
        sendResponse(res, 500, {message: 'Internal Server Error'});
    }
};

// Create a new task
const createTask = (req, res) => {
    try{
        const { error } = taskValidator(req.body);

        if (error) {
            logger.error('Invalid Task Creation Request', error.details[0].message);
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
    }
    catch(error){
        logger.error('Error Creating Task', error);
        sendResponse(res, 500, {message: 'Internal Server Error'});
    }
};

// Update a task by ID
const updateTask = (req, res) => {
    try{
        const taskId = parseInt(req.params.id);
        const task = tasks.find((t) => t.id === taskId);

        if (!task) {
            logger.info('Task with Task ID: ', taskId," not found") 
            sendResponse(res, 404, { message: 'Task not found' });
            return;
        }

        const { error } = taskValidator(req.body);

        if (error) {
            logger.error('Error Occured - '. error);
            sendResponse(res, 400, { message: error.details[0].message });
            return;
        }

        task.title = req.body.title;
        task.description = req.body.description;
        task.completed = req.body.completed;
        task.priority = req.body.priority;

        logger.info('Task Updated Successfully. Task Id- ', taskId, ';Updated Task- ', task);
        sendResponse(res, 200, task);
    }
    catch(error){
        logger.error('Error Creating Task', error);
        sendResponse(res, 500, {message: 'Internal Server Error'});
    }
};

// Delete a task by ID
const deleteTask = (req, res) => {
    try{
        const taskId = parseInt(req.params.id);
        const taskIndex = tasks.findIndex((t) => t.id === taskId);

        if (taskIndex === -1) {
            logger.info('Task with Task ID: ', taskId," not found") 
            sendResponse(res, 404, { message: 'Task not found' });
            return;
        }

        tasks.splice(taskIndex, 1);
        sendResponse(res, 200, { message: 'Task deleted' });
    }
    catch(error){
        logger.error('Error Creating Task', error);
        sendResponse(res, 500, {message: 'Internal Server Error'});
    }
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
