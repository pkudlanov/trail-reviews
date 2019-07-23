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

    it('gets review by id with GET:id', async() => {
        const review = await Review.create({
            reviewer: 'Someone Else',
            distance: 28,
            difficulty: 2,
            review: 'Some other boring trail.'
        });

        return request(app)
            .get(`/api/v1/reviews/${review._id}`)
            .then(res => {
                expect(res.body).toEqual({
                    _id: expect.any(String),
                    reviewer: 'Someone Else',
                    distance: 28,
                    difficulty: 2,
                    review: 'Some other boring trail.',
                    __v: 0
                });
            });
    });

    it('updates a review by id with patch:id', async() => {
        const review = await Review.create({
            reviewer: 'Someone Else',
            distance: 28,
            difficulty: 2,
            review: 'Some other boring trail.'
        });

        return request(app)
            .put(`/api/v1/reviews/${review._id}`)
            .send({
                reviewer: 'George B.',
                distance: 33,
                difficulty: 8,
                review: 'This was a nightmare.'
            })
            .then(res => {
                expect(res.body).toEqual({
                    _id: expect.any(String),
                    reviewer: 'George B.',
                    distance: 33,
                    difficulty: 8,
                    review: 'This was a nightmare.',
                    __v: 0
                });
            });
    });

    it('deletes a review with DELETE:id', async() => {
        const review = JSON.parse(JSON.stringify(await Review.create({
            reviewer: 'Someone Else',
            distance: 28,
            difficulty: 2,
            review: 'Some other boring trail.'
        })));

        return request(app)
            .delete(`/api/v1/reviews/${review._id}`)
            .then(res => {
                expect(res.body).toEqual(review);
            });
    });

    // reviewer: 
    // distance: 
    // difficulty: not required
    // review:
});
