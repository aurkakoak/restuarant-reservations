const request = require('supertest');

const { app, server } = require('../server');
const db = require('../db');

describe('GET /restaurants', () => {
    // seed the database before each test
    beforeEach(async () => {
        await db('restaurants').del();
        for (let i = 1; i <= 20; i++) {
            await db('restaurants').insert({
                name: `Test Restaurant ${i}`,
                email: `test${i}@restaurant.com`
            });
        }
    });

    // clean up the database after each test
    afterEach(async () => {
        await db('restaurants').del();
    });
    it('should return restaurants with correct sorting, range', async () => {
        const sort = JSON.stringify(['name', 'asc']);
        const range = JSON.stringify([0, 5]);

        const response = await request(app)
            .get(`/restaurants?sort=${sort}&range=${range}`);

        expect(response.status).toBe(200);
        expect(response.headers['content-range']).toBe('restaurants 0-5/20');

        // check that restaurants are sorted by name in ascending order
        let isSorted = true;
        for (let i = 1; i < response.body.length; i++) {
            if (response.body[i].name < response.body[i - 1].name) {
                isSorted = false;
                break;
            }
        }
        expect(isSorted).toBe(true);

        // check that the number of restaurants in the response is correct
        expect(response.body.length).toBe(6);
    });
});

describe('POST /restaurants', () => {
    afterEach(async () => {
        await db('restaurants').del(); // clean up the database after each test
    });

    it('responds with a JSON object containing the id of the created restaurant', async () => {
        const newRestaurant = {
            name: 'Test Restaurant',
            email: 'test@restaurant.com'
        };

        const response = await request(app)
            .post('/restaurants')
            .send(newRestaurant);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('id');
    });

    it('responds with a 400 error if the request body is invalid', async () => {
        const newRestaurant = {
            name: 'Test Restaurant',
            // email is missing
        };

        const response = await request(app)
            .post('/restaurants')
            .send(newRestaurant);

        expect(response.statusCode).toBe(400);
    });
});


afterAll(done => {
    server.close(done);
});