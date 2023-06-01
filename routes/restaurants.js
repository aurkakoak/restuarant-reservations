const express = require('express');
const Joi = require('joi');

const restaurants = express.Router();
const db = require('../db');
const authenticateToken = require('../middleware/authenticateToken');
const validate = require('../middleware/validate');

const restaurantSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
  });

// Use the authenticateToken middleware on all /restaurants routes
restaurants.use(authenticateToken);

// GET /restaurants - get all restaurants
restaurants.get('/', async (req, res) => {
    const { sort, range, filter } = req.query;

    // Parse the query parameters
    let sortParams = sort ? JSON.parse(sort) : ['id', 'asc']; // default sort by 'id' ascending
    let rangeParams = range ? JSON.parse(range) : [0, 10]; // default range
    let filterParams = filter ? JSON.parse(filter) : {}; // default filter

    const { allRestaurants } = await db('restaurants').count('* as allRestaurants').first();
    // Get your data
    const restaurants = await db('restaurants')
        .select('*')
        .orderBy(sortParams[0], sortParams[1])
        .where(filterParams)
        .offset(rangeParams[0])
        .limit(rangeParams[1] - rangeParams[0] + 1);

    // Set the Content-Range header
    res.setHeader('Access-Control-Expose-Headers', 'Content-Range');
    res.setHeader('Content-Range', `restaurants ${rangeParams[0]}-${rangeParams[1]}/${allRestaurants}`);

    // Send the response
    res.json(restaurants);
});


// POST /restaurants - create a new restaurant
restaurants.post('/', validate(restaurantSchema), async (req, res) => {
    const newRestaurant = req.body;
    const [id] = await db('restaurants').insert(newRestaurant);
    res.json({ id });
});

// ... add PUT and DELETE routes as needed ...

module.exports = restaurants;