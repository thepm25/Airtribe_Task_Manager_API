const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// Define routes and route handling using the controller functions
router.get('/', taskController.getAllTasks);
router.get('/:id', taskController.getTaskById);
router.post('/', taskController.createTask);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router;