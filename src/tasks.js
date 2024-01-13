/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: API for managing tasks
 */

const express = require('express');
const Test_model = require('./Test_model');

const router = express.Router();
const tasks = [];

/**
 * @swagger
 * tags:
 *   - name: Tasks
 *     description: API for managing tasks
 * paths:
 *   /tasks:
 *     get:
 *       summary: Get a list of tasks
 *       tags: [Tasks]
 *       parameters:
 *         - in: query
 *           name: page
 *           schema:
 *             type: integer
 *           description: The page number for pagination
 *         - in: query
 *           name: pageSize
 *           schema:
 *             type: integer
 *           description: The number of tasks per page
 *         - in: query
 *           name: sortBy
 *           schema:
 *             type: string
 *           description: Sort tasks by title or createdAt
 *       responses:
 *         '200':
 *           description: A list of tasks
 *           content:
 *             application/json:
 *               example: [{"id": 1, "title": "Task 1", "description": "Description 1", "createdAt": "2023-12-20T12:00:00.000Z", "updatedAt": "2023-12-20T12:00:00.000Z"}]
 */

router.get('/', (req, res) => {
    let { page, pageSize, sortBy } = req.query;

    page = parseInt(page) || 1;
    pageSize = parseInt(pageSize) || 10;

    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    let sortedTasks = [...tasks];
    if (sortBy === 'title') {
        sortedTasks.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'createdAt') {
        sortedTasks.sort((a, b) => a.createdAt - b.createdAt);
    }
    const paginatedTasks = sortedTasks.slice(startIndex, endIndex);
    res.json({
        page,
        pageSize,
        totalTasks: sortedTasks.length,
        tasks: paginatedTasks,
    });
});

/**
 * @swagger
 * tags:
 *   - name: Tasks
 *     description: API for managing tasks
 * paths:
 *   /tasks/{id}:
 *     get:
 *       summary: Get details of a task by ID
 *       tags: [Tasks]
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: integer
 *           description: Task ID
 *       responses:
 *         '200':
 *           description: Details of the task
 *           content:
 *             application/json:
 *               example: {"id": 1, "title": "Task 1", "description": "Description 1", "createdAt": "2023-12-20T12:00:00.000Z", "updatedAt": "2023-12-20T12:00:00.000Z"}
 *         '404':
 *           description: Task not found
 *           content:
 *             application/json:
 *               example: {"error": "Task not found"}
 */

router.get('/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find((task) => task.id === taskId);

    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }

    res.json(task);
});

/**
 * @swagger
 * tags:
 *   - name: Tasks
 *     description: API for managing tasks
 * paths:
 *   /tasks:
 *     post:
 *       summary: Create a new task
 *       tags: [Tasks]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                   description: Task title
 *                 description:
 *                   type: string
 *                   description: Task description
 *       responses:
 *         '201':
 *           description: Created task
 *           content:
 *             application/json:
 *               example: {"id": 1, "title": "Task 1", "description": "Description 1", "createdAt": "2023-12-20T12:00:00.000Z", "updatedAt": "2023-12-20T12:00:00.000Z"}
 *         '400':
 *           description: Invalid request body
 *           content:
 *             application/json:
 *               example: {"error": "Title and description are required"}
 */

router.post('/', (req, res) => {
    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(400).json({ error: 'Title and description are required' });
    }

    const taskId = tasks.length + 1;
    const newTask = new Test_model(taskId, title, description);
    tasks.push(newTask);

    res.status(201).json(newTask);
});

/**
 * @swagger
 * tags:
 *   - name: Tasks
 *     description: API for managing tasks
 * paths:
 *   /tasks/{id}:
 *     put:
 *       summary: Update an existing task by ID
 *       tags: [Tasks]
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: integer
 *           description: Task ID
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                   description: Updated task title
 *                 description:
 *                   type: string
 *                   description: Updated task description
 *       responses:
 *         '200':
 *           description: Updated task
 *           content:
 *             application/json:
 *               example: {"id": 1, "title": "Updated Task 1", "description": "Updated Description 1", "createdAt": "2023-12-20T12:00:00.000Z", "updatedAt": "2023-12-20T12:00:00.000Z"}
 *         '400':
 *           description: Invalid request body
 *           content:
 *             application/json:
 *               example: {"error": "Title and description are required"}
 *         '404':
 *           description: Task not found
 *           content:
 *             application/json:
 *               example: {"error": "Task not found"}
 */

router.put('/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find((task) => task.id === taskId);

    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }

    const { title, description } = req.body;
    if (!title || !description) {
        return res.status(400).json({ error: 'Title and description are required' });
    }

    task.title = title;
    task.description = description;
    task.updatedAt = new Date();

    res.json(task);
});

/**
 * @swagger
 * tags:
 *   - name: Tasks
 *     description: API for managing tasks
 * paths:
 *   /tasks/{id}:
 *     delete:
 *       summary: Delete a task by ID
 *       tags: [Tasks]
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: integer
 *           description: Task ID
 *       responses:
 *         '200':
 *           description: Deleted task
 *           content:
 *             application/json:
 *               example: {"id": 1, "title": "Task 1", "description": "Description 1", "createdAt": "2023-12-20T12:00:00.000Z", "updatedAt": "2023-12-20T12:00:00.000Z"}
 *         '404':
 *           description: Task not found
 *           content:
 *             application/json:
 *               example: {"error": "Task not found"}
 */

router.delete('/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex((task) => task.id === taskId);

    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }

    const deletedTask = tasks.splice(taskIndex, 1)[0];

    res.json(deletedTask);
});

module.exports = router;
