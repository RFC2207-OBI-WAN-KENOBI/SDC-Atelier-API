const express = require('express');
const app = express();
const db = require('../database/index.js');
const path = require('path');
const cors = require('cors');

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '../public/')));

app.get('/reviews', (req, res) => {
  //console.log('req at the server get/reviews = ',req.query);
  db.getReviewData(req.query.product_id, 1, req.query.count, req.query.sort)
  .then(response => {
    //console.log('this is the response = ',response)
    res.send(response) })
  .catch(err => console.log(err))
})

app.get('/meta', (req, res) => {
  console.log('req at the server get/reviews = ',req.query);
  db.getReviewMeta(req.query.product_id)
  .then(response => {

    console.log('this is the response = ',response)

    res.send(response) })
  .catch(err => console.log(err))
})


//db.getReviewData(1,1,5,'helpfulness');

const PORT = 8080;


app.listen(PORT);
console.log(`Server listening at port ${PORT}`)