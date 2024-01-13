# Task Management API

This is a simple Task Management API built with Node.js and Express.

## Table of Contents
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [How to Run Locally](#how-to-run-locally)

## Getting Started

### Prerequisites
- Node.js installed

### Installation
1. Clone the repository:

    ```bash
    git clone https://github.com/Mohamed-98/task-nodejs.git
    cd task-nodejs.git
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

## API Endpoints

### Get a list of tasks

**Endpoint:**
GET /tasks

**Parameters:**
- `page` (optional): The page number for pagination
- `pageSize` (optional): The number of tasks per page
- `sortBy` (optional): Sort tasks by title or createdAt

**Example Response:**
```json
{
  "page": 1,
  "pageSize": 10,
  "totalTasks": 1,
  "tasks": [
    {
      "id": 1,
      "title": "Task 1",
      "description": "Description 1",
      "createdAt": "2023-12-20T12:00:00.000Z",
      "updatedAt": "2023-12-20T12:00:00.000Z"
    }
  ]
}
```
### Get details of a task by ID
**Endpoint:**
GET /tasks/{id}
**Parameters:**

- `id` (required): Task ID

**Example Response:**

```json
{
  "id": 1,
  "title": "Task 1",
  "description": "Description 1",
  "createdAt": "2023-12-20T12:00:00.000Z",
  "updatedAt": "2023-12-20T12:00:00.000Z"
}
```
### Create a new task

**Endpoint:**

POST /tasks
Request Body:

```json
{
  "title": "New Task",
  "description": "New Task Description"
}
```

**Example Response:**

```json
{
  "id": 2,
  "title": "New Task",
  "description": "New Task Description",
  "createdAt": "2023-12-20T12:30:00.000Z",
  "updatedAt": "2023-12-20T12:30:00.000Z"
}
```
### Update an existing task by ID
**Endpoint:**
PUT /tasks/{id}
**Parameters:**

id (required): Task ID
Request Body:
```json
{
  "title": "Updated Task",
  "description": "Updated Task Description"
}
```
**Example Response:**
```json
{
  "id": 2,
  "title": "Updated Task",
  "description": "Updated Task Description",
  "createdAt": "2023-12-20T12:30:00.000Z",
  "updatedAt": "2023-12-20T12:35:00.000Z"
}
```
### Delete a task by ID
**Endpoint:**
DELETE /tasks/{id}
**Parameters:**

id (required): Task ID
**Example Response:**
```json
{
  "id": 2,
  "title": "Updated Task",
  "description": "Updated Task Description",
  "createdAt": "2023-12-20T12:30:00.000Z",
  "updatedAt": "2023-12-20T12:35:00.000Z"
}
```
How to Run Locally
1. Start the server:
```
npm start
```
2- Open your browser and visit http://localhost:3000/api-docs to access the Swagger documentation.

3- Use your preferred API client (e.g., Postman) to test the API endpoints.
