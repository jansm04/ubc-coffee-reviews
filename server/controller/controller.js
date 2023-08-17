const Review = require('../model/model')
const mongoose = require('mongoose')

// get all reviews
const getReviews = async (req, res) => {
    const reviews = await Review.find({}).sort({createdAt: -1})
    res.status(200).json(reviews)
}

// get one review
const getOneReview = async (req, res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            error: "Error: invalid object ID."
        })
    }
    const review = await Review.findById(id)
    if (!review) {
        return res.status(404).json({
            error: `Error: can not find object under ID ${id} as object does not exist.`
        })
    }
    res.status(200).json(review)
}

// post review
const postReview = async (req, res) => {
    const review = {
        username: req.body.username,
        shop: req.body.shop,
        rating: req.body.rating,
        review: req.body.review
    }
    try {
        const newReview = await Review.create(review)
        res.status(200).json(newReview)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
    
}

// delete review
const deleteOneReview = async (req, res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: "Error: invalid object ID."})
    }
    const review = await Review.findOneAndDelete({_id: id})
    if (!review) {
        return res.status(400).json({
            error: `Error: Cannot delete object under ID ${id} as object does not exist.`
        })
    }
    res.status(200).json(review)
}

// update review
const updateOneReview = async (req, res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: "Error: invalid object ID."})
    }
    const review = await Review.findOneAndUpdate({_id: id}, {...req.body})
    if (!review) {
        return res.status(400).json({
            error: `Error: Cannot update object under ID ${id} as object does not exist.`
        })
    }
    res.status(200).json(review)
}


module.exports = {
    getReviews,
    getOneReview,
    postReview,
    deleteOneReview,
    updateOneReview
}