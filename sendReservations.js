const nodemailer = require('nodemailer');
const knex = require('knex');

// setup knex with the database connection
const db = knex({
  client: 'pg',
  connection: process.env.DATABASE_URL,
  migrations: {
    tableName: 'knex_migrations',
    directory: './migrations'
  }
});

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  service: 'gmail', // use 'gmail' here if you want to use Gmail
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASSWORD, 
  },
});

async function sendEmails() {
  // get today's reservations
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const reservations = await db('reservations')
    .whereBetween('reservation_time', [today, tomorrow]);

  // group reservations by restaurant
  const grouped = reservations.reduce((acc, cur) => {
    (acc[cur.restaurant_name] = acc[cur.restaurant_name] || []).push(cur);
    return acc;
  }, {});

  // send an email to each restaurant with the list of reservations
  for (let restaurant in grouped) {
    let mailOptions = {
      from: process.env.EMAIL_USER,
      to: restaurant, // in real application, you should have an email field for each restaurant
      subject: 'Today\'s Reservations',
      text: `Here is the list of reservations for today: \n${grouped[restaurant].map(reservation => `Customer: ${reservation.customer_name}, Time: ${reservation.reservation_time}`).join('\n')}`
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }
}

sendEmails();
