require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port =  process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/reservations', require('./routes/reservations'));
app.use('/restaurants', require('./routes/restaurants'));

app.get(['/', '/health-check'], (req, res) => {
  return res.status(200).json({ message: 'Welcome to the restaurant-reservations' });
})


let server = app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

module.exports = {app, server};