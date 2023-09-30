# Airtribe_Task_Manager_API
TASK MANAGER API Project

This is a simple RESTful API for a task manager application built using Node.js and Express.js. The API allows users to perform CRUD operations (Create, Read, Update, and Delete) on tasks. Each task has a title, description, completion status, and priority level. The API includes input validation, error handling, and optional features like filtering and sorting tasks.

Table of Contents
Getting Started
Prerequisites
Installation
Usage
Endpoints
Input Validation
Error Handling
Optional Features
Filtering and Sorting

Getting Started:

Prerequisites-

Before you begin, ensure you have met the following requirements:

Node.js and npm installed on your development machine.
A code editor like Visual Studio Code or any of your choice.

Installation
    Clone the repository:
    git clone https://github.com/yourusername/task-manager-api.git

Navigate to the project directory:
    cd task-manager-api

Install the project dependencies:
    npm install

Start the server:
    npm start

The server should now be running locally on port 3000.

Usage-

Endpoints
    GET /tasks: Retrieve all tasks.
    GET /tasks/:id: Retrieve a single task by its ID.
    POST /tasks: Create a new task.
    PUT /tasks/:id: Update an existing task by its ID.
    DELETE /tasks/:id: Delete a task by its ID.

Input Validation
    The API validates input for task creation and updates to ensure that the title and description are not empty and that the completion status is a boolean value.
    The priority level is also validated to ensure it is one of the following values: "low," "medium," or "high."

Error Handling
    The API includes error handling for invalid requests. It returns appropriate HTTP status codes and error messages for different scenarios, such as task not found or validation errors.

Optional Features-

Filtering and Sorting
    The API supports filtering tasks based on completion status and sorting them by creation date.
    Users can assign a priority level ("low," "medium," "high") to each task and filter tasks based on priority level.
    Example Filtering and Sorting Requests:
        To retrieve all completed tasks, use the following request:
        GET /tasks?completed=true

        To retrieve all tasks sorted by creation date in descending order, use the following request:
        GET /tasks?sortBy=createdAt:desc

        To retrieve tasks with "medium" priority, use:
        GET /tasks/priority/medium