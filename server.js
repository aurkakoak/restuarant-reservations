const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');
const Joi = require('joi');

const app = express();
const port = 3000 || process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get(['/', '/health-check'], (req, res) => {
  return res.status(200).json({ message: 'Welcome to the restaurant-reservations' });
})

const reservationSchema = Joi.object({
  customer_name: Joi.string().required(),
  restaurant_name: Joi.string().required(),
  reservation_time: Joi.date().iso().required()
});


app.post('/reservations', async (req, res) => {
  const { error } = reservationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: 'Bad request', error: error.details[0].message });
  }

  const { customer_name, restaurant_name, reservation_time } = req.body;

  try {
    const reservation = await db('reservations').insert({
      customer_name,
      restaurant_name,
      reservation_time
    });

    res.status(201).json({ message: 'Reservation created successfully', reservation });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating reservation' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;