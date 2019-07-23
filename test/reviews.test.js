require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Review = require('../lib/models/Review');

describe('app routes', () => {
    beforeAll(() => {
        connect();
    });

    beforeEach(() => {
        return mongoose.connection.dropDatabase();
    });

    afterAll(() => {
        return mongoose.connection.close();
    });

    it('creates a new review with POST', () => {
        return request(app)
            .post('/api/v1/reviews')
            .send({
                reviewer: 'Billy Nye',
                distance: 21,
                difficulty: 4,
                review: 'It was a rather hard two day hike. Not too hard though.'
            })
            .then(res => {
                expect(res.body).toEqual({
                    _id: expect.any(String),
                    reviewer: 'Billy Nye',
                    distance: 21,
                    difficulty: 4,
                    review: 'It was a rather hard two day hike. Not too hard though.',
                    __v: 0
                });
            });
    });

    it('gets all reviews with GET', async() => {
        const reviews = await Review.create([{
            reviewer: 'Me',
            distance: 123,
            difficulty: 9,
            review: 'Some boring trail.'
        }, {
            reviewer: 'Someone Else',
            distance: 28,
            difficulty: 2,
            review: 'Some other boring trail.'
        }, {
            reviewer: 'Joe',
            distance: 3,
            difficulty: 1,
            review: 'Some exciting trail.'
        },
        ]);

        return request(app)
            .get('/api/v1/reviews')
            .then(res => {
                const reviewsJSON = JSON.parse(JSON.stringify(reviews));
                reviewsJSON.forEach(review => {
                    expect(res.body).toContainEqual({
                        _id: review._id,
                        reviewer: review.reviewer,
                        distance: review.distance,
                        difficulty: review.difficulty,
                        review: review.review,
                        __v: 0
                    });
                });
            });
    });

    // reviewer: 
    // distance: 
    // difficulty: not required
    // review:
});
