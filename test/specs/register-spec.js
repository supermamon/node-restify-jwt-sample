'use strict'

require('../../')
const config    = require('../../config')
//const headers   = require('../../test/headers')
const chai      = require('chai')
const chaiHttp  = require('chai-http')

const expect    = chai.expect
chai.should()
chai.use(chaiHttp)

const PORT = config.PORT
const HOST = config.HOST
const endpoint = `http://${HOST}:${PORT}`

describe('ROUTE: /api/register', () => {
    var request
    before( (done) => {
        request = chai.request(endpoint).keepOpen()
        done()
    })

    it('should be a bad request without name', (done) => {
        request
        .post('/api/register')
        .send({ role: 'test' })
        .end( (err, res) => {
            expect(err).to.be.null
            res.should.have.status(400)
            expect(res.body.code).to.equal('BadRequest')
            expect(res.body.message).to.equal('Incomplete registration information.')
            done()
        })
    })
    it('should be a bad request without role', (done) => {
        request
        .post('/api/register')
        .send({ name: 'ci-test-account' })
        .end( (err, res) => {
            expect(err).to.be.null
            res.should.have.status(400)
            expect(res.body.code).to.equal('BadRequest')
            expect(res.body.message).to.equal('Incomplete registration information.')

            done()
        })
    })
    it('should be a bad request without a password', (done) => {
        request
        .post('/api/register')
        .send({
            name: 'ci-test-account',
            role: 'test'
        })
        .end( (err, res) => {
            expect(err).to.be.null
            res.should.have.status(400)
            expect(res.body.code).to.equal('BadRequest')
            expect(res.body.message).to.equal('Incomplete registration information.')

            done()
        })
    })
    it('should only return usename and role with token', (done) => {
        request
        .post('/api/register')
        .send({
            name: 'ci-test-account',
            role: 'test',
            password: 'some-hashed-password'
        })
        .end( (err, res) => {
            expect(err).to.be.null
            res.should.have.status(200)

            // matches input
            expect(res.body.name).to.equal('ci-test-account')
            expect(res.body.role).to.equal('test')
            expect(res.body.password).to.be.undefined

            // has output
            expect(res.body.token).to.not.be.undefined
            expect(res.body.token).to.not.be.empty
            expect(res.body.token).to.be.a('string').that.is.not.empty

            done()
        })
    })
})
