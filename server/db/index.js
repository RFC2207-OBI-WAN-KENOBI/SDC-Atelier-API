const { Pool, Client } = require('pg')
const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '../.env')});

const client = new Client ({
  host: 'localhost',
  user: 'postgres',
  password: 'password',
  port: '5432',
  database: 'obi-wan-reviews'
})



// client.query(`SELECT * FROM review WHERE product_id = 1 LIMIT 2`)
// .then(res => {
//   //console.log(res.rows);
// })

// const client = new Client({
  //   host: process.env.HOST,
  //   user: process.env.USERNAME,
  //   port: process.env.DBPORT,
  //   password: process.env.PASSWORD,
  //   database: process.env.DATABASE,
  // })

  client.connect();
module.exports.client = client;

