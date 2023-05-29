const Joi = require('joi');
const db = require('../db');

const reservations = express.Router();

// Define the validation schema
const reservationSchema = Joi.object({
  name: Joi.string().min(3).required(),
  phone: Joi.string().min(10).required(),
  restaurant_id: Joi.number().integer().required(), // add validation for restaurant_id
  num_people: Joi.number().integer().required(),
  reservation_time: Joi.date().iso().required()
});

reservations.post('/', async (req, res, next) => {
  // Validate the request body
  const { error } = reservationSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { name, phone, restaurant_id, num_people, reservation_time } = req.body;

  try {
    // Check if the restaurant exists
    const restaurant = await db('restaurants').where('id', restaurant_id).first();
    if (!restaurant) return res.status(404).send('Restaurant not found');

    // Insert the reservation into the database
    const [id] = await db('reservations').insert({
      name,
      phone,
      restaurant_id, // use the restaurant_id from the request body
      num_people,
      reservation_time
    });

    // Send the reservation ID in the response
    res.json({ id });
  } catch (err) {
    next(err);
  }
});

module.exports = reservations;
