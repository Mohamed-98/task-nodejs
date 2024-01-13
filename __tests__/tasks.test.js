const request = require('supertest');
const app = require('../src/app');

describe('Tasks API', () => {
    it('get a list of tasks', async () => {
        const response = await request(app).get('/tasks');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('tasks');
    });

    it('create a new task', async () => {
        const newTask = {
            title: 'Test Task',
            description: 'Test Description',
        };

        const response = await request(app)
            .post('/tasks')
            .send(newTask);

        expect(response.status).toBe(201);
        expect(response.body.title).toBe(newTask.title);
        expect(response.body.description).toBe(newTask.description);
    });
    it('update an existing task', async () => {
        const newTask = {
            title: 'Test Task',
            description: 'Test Description',
        };

        const createResponse = await request(app)
            .post('/tasks')
            .send(newTask);

        const updatedTask = {
            title: 'Updated Test Task',
            description: 'Updated Test Description',
        };

        const updateResponse = await request(app)
            .put(`/tasks/${createResponse.body.id}`)
            .send(updatedTask);

        expect(updateResponse.status).toBe(200);
        expect(updateResponse.body.title).toBe(updatedTask.title);
        expect(updateResponse.body.description).toBe(updatedTask.description);
    });

});
