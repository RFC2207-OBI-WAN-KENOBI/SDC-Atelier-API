const { Client } = require('pg');
const Promise = require('bluebird');

const connection = new Client({
  host:'localhost',
  user:'postgres',
  password:'password',
  port:'5432',
  database:'obi-wan-reviews'

});
const db = Promise.promisifyAll(connection, { multiArgs: true });

db.connectAsync()
  .then(() => console.log('Connected to DB'))
  .catch((err) => console.log('Error connecting to the DB', err))


const getReviews = (req,res) => {

  // pool.query('SELECT * FROM review LIMIT 2')
  // .then(result => {res.send(result)})
  // .catch((err) => (console.log('error in getting reviews ', err)))

  console.log('got reviews')
  return db.queryAsync(
    'SELECT * FROM review LIMIT 2')
  .then((res) => {
    console.log(res[0].rows[0].summary);
    return res[0].rows[0].summary;
  })
  .catch((err) => (console.log('error in getting reviews',err)));
}

getReviews();

module.exports.getReviews = getReviews;