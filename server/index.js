const express = require('express');
const app = express();
const db = require('../database/index.js');
// app.use(express.urlencoded({
//   extended: true,
// }));
// app.use(express.json());
app.use(express.static('./public'))

app.get('http://localhost:8080/reviews', (req, res) => {
  return db.getReviews()
  .then(response => { res.send(response) })
  .catch(err => console.log(err))
})

//db.getReviews();

const PORT = 8080;

app.listen(PORT);
console.log(`Server listening at port ${PORT}`)