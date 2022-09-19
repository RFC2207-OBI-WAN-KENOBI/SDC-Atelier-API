const { Client } = require('pg');
const Promise = require('bluebird');

const connection = new Client({
  host: 'localhost',
  user: 'postgres',
  password: 'password',
  port: '5432',
  database: 'obi-wan-reviews'

});

//future store in the .env file

const db = Promise.promisifyAll(connection, { multiArgs: true });

db.connectAsync()
  .then(() => console.log('Connected to DB'))
  .catch((err) => console.log('Error connecting to the DB', err))

const getReviewData = (product_Id, page = 1, count = 5, sort = 'helpfulness') => {

  if(sort === 'newest') {
    sort = 'date'
  }

// TODO:  refactor so that the there is an additional column in the table that is a combination of the helpfulness and the date or runs a query and then filters... not sure
  if(sort === 'relevant') {
    sort = 'helpfulness'
  }

//TODO:  activate the page number param to working order

  return db.queryAsync(
    `SELECT review.id as review_id, review.product_id, review.rating, review.date, review.summary, review.body, review.recommend, review.reviewer_name, review.response, review.helpfulness,
      (
        SELECT array_to_json(coalesce(array_agg(photo), array[]::record[]))
        from
        (
          SELECT photos.id, photos.url FROM public.photos WHERE photos.review_id = ${product_Id} ORDER BY id ASC LIMIT 5
        ) photo
      ) as photos

    FROM public.review WHERE review.product_id=${product_Id} ORDER BY ${sort} DESC LIMIT ${count}`)
    .then((res) => {
      //console.log(res[0].rows);
      return {'product': product_Id, 'page':page, 'count':count, 'result':res[0].rows}
    })
    .then((res) => {
      //console.log(res);
      return res
    })
    .catch((err) => (console.log('error in getting reviews', err)));
}

const getReviewMeta = (product_id) => {
  return db.queryAsync(
    `SELECT
	    (SELECT product_id FROM review WHERE product_id = ${product_id} LIMIT 1),
      (SELECT json_object_agg(rating, count) ratings FROM (SELECT rating, COUNT(rating) FROM review WHERE product_id = ${product_id} GROUP BY rating) ratings),
      (SELECT json_object_agg(recommend, count) recommended FROM (SELECT recommend, COUNT(recommend) FROM review WHERE product_id = ${product_id} GROUP BY recommend) recommended),
      (SELECT json_object_agg(name, json_build_object('id', id, 'value', avg)) AS
      characteristics FROM (SELECT name, characteristics.id, AVG(value) FROM characteristics LEFT JOIN characteristicreviews ON characteristics.id = characteristicreviews.characteristic_id WHERE characteristics.product_id = ${product_id} GROUP BY characteristics.id) characteristics)`
  )
  .then((res) => {
    //console.log(res[0].rows);
    return res[0].rows;
  })
  .catch((err) => (console.log('error in getting metadata', err)));
}


//getReviewData(5,1,3, 'date')  //getReviewData query test
module.exports.getReviewData = getReviewData;
module.exports.db = db;