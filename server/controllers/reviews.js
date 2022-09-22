var models = require('../models');

module.exports = {

  getReview: function (req, res) {
    //console.log('this is the req for the function getReview =',req.query);
    var params = [req.query.product_id,1, req.query.count, req.query.sort]
    //console.log('these are the params in the getReview func =',params);
    return models.reviews.getReviewData(params)
      .then((data) => {
        //console.log('this is the data at the controller =', data)
        res.send(data)
      })
      .catch((err) => {
        console.log('this error is from the model =',err)
      })
  },

  getMeta: function (req, res) {
    //console.log('this is the req.query.product_id =',req.query.product_id);
    var params = req.query.product_id;
    return models.reviews.getReviewMeta(params)
      .then((data) => {
        res.send(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // postReview: function (req, res) {
  //   var params = req.query.postObject;
  //   return models.reviews.postReview(params)
  //   .then((data) => {
  //     res.status(200).send(console.log('review posted'))
  //   })
  //   .catch((err) => {
  //     console.log(err)
  //   })
  // }

  // putHelpful: function (req,res) {
  //   var params = req.query.reviewId;
  //   return models.reviews.markHelpful(params)
  //   .then((data) => {
  //     res.status(204).send(console.log('increased helpfulness'))
  //   })
  //   .catch((err) => {
  //     console.log(err)
  //   })
  // }

  // putReported: function (req,res) {
  //   var params = req.query.reviewId;
  //   return models.reviews.markReported(params)
  //   .then((data) => {
  //     res.status(204).send(console.log('review reported'))
  //   })
  //   .catch((err) => {
  //     console.log(err)
  //   })
  // }
}