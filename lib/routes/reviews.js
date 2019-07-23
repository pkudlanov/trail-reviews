const { Router } = require('express');
const Review = require('../models/Review');

module.exports = Router()
    .post('/', (req, res, next) => {
        const {
            reviewer,
            distance,
            difficulty,
            review
        } = req.body;

        Review
            .create({ reviewer, distance, difficulty, review })
            .then(review => res.send(review))
            .catch(next);
    })
    .get('/', (req, res, next) => {
        Review
            .find()
            .then(reviews => res.send(reviews))
            .catch(next);
    })
    .get('/:id', (req, res, next) => {
        Review
            .findById(req.params.id)
            .then(review => res.send(review))
            .catch(next);
    });

// reviewer: 
// distance: 
// difficulty: not required
// review:
