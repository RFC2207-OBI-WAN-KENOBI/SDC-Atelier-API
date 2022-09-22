var db = require('../db').client;
const { Pool, Client } = require('pg')
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });


module.exports = {
  getReviewData: function (params) {
    //console.log('params from models',params);
    let sortString = '';
    if (params[3] === 'relevant' || params[3] === undefined) {
      sortString = 'helpfulness DESC, date DESC'
    }
    if (params[3] === 'helpfulness') {
      sortString = 'helpfulness DESC'
    }
    if (params[3] === 'newest') {
      sortString = 'date DESC'
    }
    const queryArgs = [params[0] || 1, params[2] || 10]
    //console.log(queryArgs);
    //const queryString = `SELECT * FROM review WHERE product_id = 1 LIMIT 2`
    const queryString =
      `SELECT review.id as review_id, review.product_id, review.rating, review.date, review.summary, review.body, review.recommend, review.reviewer_name, review.response, review.helpfulness,
    (
      SELECT array_to_json(coalesce(array_agg(photo), array[]::record[]))
      from
      (
        SELECT photos.id, photos.url FROM public.photos INNER JOIN public.review r ON review.id = photos.review_id WHERE photos.review_id = r.id ORDER BY id ASC LIMIT 5
        ) photo
        ) as photos

        FROM public.review WHERE review.product_id=$1 AND review.reported=false
        ORDER BY ${sortString}
        LIMIT $2`
      ;

    return db.query(queryString, queryArgs)
      .then((res) => {
        //console.log('from the query on reviews.js =',res.rows);
        //console.log(res.rows);
        return { 'product': queryArgs[0], 'page': 1, 'count': queryArgs[1], 'results': res.rows }
      })
      .then((res) => {
        //console.log('this is the response from the query at the models =',res);
        return res
      })
      .catch((err) => (console.log('error in getting reviews', err)));
  },

  getReviewMeta: (params) => {
    const queryArgs = [params]
    const queryString = `SELECT
            (SELECT product_id FROM review WHERE product_id = $1 LIMIT 1),
            (SELECT json_object_agg(rating, count) ratings FROM (SELECT rating, COUNT(rating) FROM review WHERE product_id = $1 GROUP BY rating) ratings),
            (SELECT json_object_agg(recommend, count) recommended FROM (SELECT recommend, COUNT(recommend) FROM review WHERE product_id = $1 GROUP BY recommend) recommended),
            (SELECT json_object_agg(name, json_build_object('id', id, 'value', avg)) AS
            characteristics FROM (SELECT name, characteristics.id, AVG(value) FROM characteristics LEFT JOIN characteristicreviews ON characteristics.id = characteristicreviews.characteristic_id WHERE characteristics.product_id = $1 GROUP BY characteristics.id) characteristics)`

    return db.query(queryString, queryArgs)
      .then((res) => {
        //console.log(res.rows[0]);
        return res.rows[0];
      })
      .catch((err) => (console.log('error in getting metadata', err)));
  }
  // const postReview = (postObject) => {
  //   const product_id = postObject.product_id
  //   const rating = postObject.rating
  //   const summary = postObject.summary
  //   const body = postObject.body
  //   const recommend = postObject.recommend
  //   const reviewer_name = postObject.reviewer_name
  //   const reviewer_email = postObject.reviewer_email
  //   const date = postObject.date || Date.now()
  //   const response = null
  //   const helpfulness = '0'
  //   const photos = postObject.photos
  //   const characteristics = postObject.characteristics

  //   const queryArgs = [product_id, rating, summary, body, recommend, reviewer_name, reviewer_email, date, response, helpfulness, photos, characteristics]

  //   const queryString =
  //     `INSERT INTO review (product_id, rating, summary, body, recommend, reviewer_name, reviewer_email, date, response, helpfulness) VALUES ($1,$2,'$3','$4',$5,'$6','$7',$8,'$9',$10)`

  //   const queryString2 =  `INSERT INTO photos (url, review_id) VALUES ('${url}', (SELECT MAX (id) FROM review))`

  //   const queryString3 = `INSERT INTO characteristics (product_id, name) VALUES ($1, '${charObj[key]}')`

  //   const queryString4 = `INSERT INTO characteristicreviews (characteristic_id, review_id, value) VALUES ((SELECT MAX (id) FROM characteristics), (SELECT MAX (id) FROM review), ${characteristics[key]})`

  //   db.query(queryString, queryArgs)
  //     .then(() => {
  //       console.log('successfully posted review');
  //     })
  //     .catch((err) => (console.log('error in posting 1', err)));
  //   photos.forEach((url) => {
  //     db.query(queryString2, queryArgs)
  //       .then(() => {
  //         console.log('successfully posted photo');
  //       })
  //       .catch((err) => (console.log('error in posting 2', err)));
  //   })
  //   const charObj = {
  //     223577: 'Fit',
  //     223578: 'Length',
  //     223579: 'Comfort',
  //     223580: 'Quality'
  //   }
  //   for (var key in characteristics) {
  //     db.query(queryString3,queryArgs)
  //       .then(() => {
  //         console.log('successfully posted characteristics 1');
  //       })
  //       .catch((err) => (console.log('error in posting 3', err)));
  //     db.query(queryString4, queryArgs)
  //       .then(() => {
  //         console.log('successfully posted characteristics 2');
  //       })
  //       .catch((err) => (console.log('error in posting 4', err)));
  //   }
  // }
  // const markHelpful = (reviewId) => {
  //   const queryArgs = [reviewId]
  //   const queryString =`UPDATE review SET helpfulness = helpfulness + 1 WHERE id = $1`
  //   db.query(queryString,queryArgs)
  //     .then(() => {
  //       console.log('successfully increased helpfulness');
  //     })
  //     .catch((err) => (console.log('error in increasing helpfulness', err)));
  // }
  // const markReported = (reviewId) => {
  //   const queryArgs = [reviewId]
  //   const queryString =`UPDATE review SET reported = true WHERE id = $1`
  //   db.query(queryString,queryArgs)
  //     .then(() => {
  //       console.log('successfully reported');
  //     })
  //     .catch((err) => (console.log('error in markReported', err)));
  // }
}
