
var controller = require('./controllers');
var router = require('express').Router();

//Connect controller methods to their corresponding routes
router.get('', controller.reviews.getReview)  // just products... continues to url path app.use(/reviews, router)

router.get('/meta', controller.reviews.getMeta);  // /:variable url  placeholder and endpoint variable

// router.post('', controller.reviews.postReview);

// router.put('/:review_id/helpful', controller.reviews.putHelpful);

// router.put('/:review_id/report', controller.reviews.putReported);

module.exports = router;