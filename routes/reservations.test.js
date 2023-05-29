const request = require('supertest');
const { app, server } = require('../server');
const db = require('../db');

describe('POST /reservations', () => {
    let restaurant;

    // create a restaurant before each test
    beforeEach(async () => {
        [restaurant] = await db('restaurants').insert({
            name: 'Test Restaurant',
            email: 'test@restaurant.com'
        }, ['id']);
    });

    // clean up the database after each test
    afterEach(async () => {
        await db('reservations').del();
        await db('restaurants').del();
    });

    it('responds with a JSON object containing the id of the created reservation', async () => {
        const response = await request(app)
            .post('/reservations')
            .send({
                customer_name: 'John Doe',
                phone: '1234567890',
                restaurant_id: restaurant.id, // use the id of the restaurant created before the test
                num_people: 4,
                reservation_time: new Date().toISOString()
            });

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('id');
    });

    it('responds with a 400 error if the request body is invalid', async () => {
        const response = await request(app)
            .post('/reservations')
            .send({
                customer_name: 'John Doe',
                phone: '1234567890',
                // omit the restaurant_id in the request body
                num_people: 4,
                reservation_time: new Date().toISOString()
            });

        expect(response.statusCode).toBe(400);
    });

    it('responds with a 404 error if the restaurant does not exist', async () => {
        const response = await request(app)
            .post('/reservations')
            .send({
                customer_name: 'John Doe',
                phone: '1234567890',
                restaurant_id: 99999, // use a non-existent restaurant_id for testing
                num_people: 4,
                reservation_time: new Date().toISOString()
            });

        expect(response.statusCode).toBe(404);
    });
});
afterAll(done => {
    server.close(done);
});