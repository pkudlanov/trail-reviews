const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    reviewer: {
        type: String,
        required: true
    },
    distance: {
        type: Number,
        required: true
    },
    difficulty: Number,
    review: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Review', reviewSchema);
