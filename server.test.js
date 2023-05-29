const request = require('supertest');
const app = require('./server');

describe('POST /reservations', () => {
  it('responds with 201 created', async () => {
    const newReservation = {
      customer_name: 'John Doe',
      restaurant_name: 'The Great Restaurant',
      reservation_time: new Date().toISOString()
    };

    const response = await request(app)
      .post('/reservations')
      .send(newReservation);

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe('Reservation created successfully');
  });

  it('responds with 400 on bad request', async () => {
    const newReservation = {
      customer_name: '',
      restaurant_name: 'The Great Restaurant',
      reservation_time: new Date().toISOString()
    };

    const response = await request(app)
      .post('/reservations')
      .send(newReservation);

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Bad request');
  });

  it('responds with 400 on invalid date format', async () => {
    const newReservation = {
      customer_name: 'John Doe',
      restaurant_name: 'The Great Restaurant',
      reservation_time: 'invalid-date'
    };
  
    const response = await request(app)
      .post('/reservations')
      .send(newReservation);
  
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Bad request');
  });
  
});
