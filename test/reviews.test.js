require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
// const Review = require('../lib/models/Review');

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

    

    // reviewer: 
    // distance: 
    // difficulty: not required
    // review:
});
