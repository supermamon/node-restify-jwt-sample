'use strict'

const apiserver = require('../../test/server')
const expect    = require('chai').expect

describe('ROUTE: /api/register', () => {
    it('should be a bad request without name', (done) => {
        apiserver
        .post('/api/register')
        .send({ role: 'test' })
        .expect('Content-type', /json/)
        .end( (err, res) => {
            if (err) {
                console.log(err.message)
                return done(new Error('Supertest encountered an error'))
            }

            expect(res.status).to.equal(400)
            expect(res.body.code).to.equal('BadRequest')
            expect(res.body.message).to.equal('Incomplete registration information.')

            done()
        })
    })
    it('should be a bad request without role', (done) => {
        apiserver
        .post('/api/register')
        .send({ name: 'ci-test-account' })
        .expect('Content-type', /json/)
        .end( (err, res) => {
            if (err) {
                console.log(err.message)
                return done(new Error('Supertest encountered an error'))
            }

            expect(res.status).to.equal(400)
            expect(res.body.code).to.equal('BadRequest')
            expect(res.body.message).to.equal('Incomplete registration information.')

            done()
        })
    })
    it('should return input data with token', (done) => {
        apiserver
        .post('/api/register')
        .send({
            name: 'ci-test-account',
            role: 'test'
        })
        .expect('Content-type', /json/)
        .end( (err, res) => {
            if (err) {
                console.log(err.message)
                return done(new Error('Supertest encountered an error'))
            }

            // no errors
            expect(res.status).to.equal(200)
            expect(res.body.error).to.be.undefined

            // matches input
            expect(res.body.name).to.equal('ci-test-account')
            expect(res.body.role).to.equal('test')

            // has output
            expect(res.body.token).to.not.be.undefined
            expect(res.body.token).to.not.be.empty
            expect(res.body.token).to.be.a('string').that.is.not.empty

            done()
        })
    })
})
