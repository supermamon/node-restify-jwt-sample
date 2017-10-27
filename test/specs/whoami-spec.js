'use strict'

const apiserver    = require('../../test/server')
const headers   = require('../../test/headers')
const expect    = require('chai').expect

describe('ROUTE: /api/whoami', function (){
    it('should say name is ci-test-account', (done) => {
        apiserver
        .get('/api/whoami')
        .set('Authorization', headers.Authorization)
        .expect('Content-type', /json/)
        .expect(200) // THis is HTTP response
        .end( (err, res) => {
            if (err) {
                console.log(err.message)
                return done(new Error('Supertest encountered an error'))
            }

            expect(res.body.error).to.undefined
            expect(res.body.name).to.equal('ci-test-account')

            return done()
        })
    })
})
