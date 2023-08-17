const mongoose = require('mongoose')

const Schema = mongoose.Schema

var reviewSchema = new Schema(
    {
        username: {
            type: String,
            required: true
        },
        shop: {
            type: String,
            required: true
        },
        rating: {
            type: String,
            required: true
        },
        review: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

const model = mongoose.model('Review', reviewSchema)

module.exports = model