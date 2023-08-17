const express = require('express')
const controller = require('../controller/controller')

const router = express.Router()

/*
 -- CRUD API --
*/


// get all reviews
router.get('/', controller.getReviews)

// get one workout
router.get('/:id', controller.getOneReview)

// post a workout
router.post('/', controller.postReview)

// delete a workout
router.delete('/:id', controller.deleteOneReview)

// update a review
router.patch('/:id', controller.updateOneReview)

module.exports = router

