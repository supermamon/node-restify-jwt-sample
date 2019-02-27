'use strict'

const apiserver = require('../../test/server')
const headers   = require('../../test/headers')
const expect    = require('chai').expect

describe('ROUTE: /api/admin', () => {
    it('should say action=completed for admin/test', (done) => {
        apiserver
        .get('/api/admin')
        .set('Authorization', headers.Authorization)
        .expect('Content-type', /json/)
        .expect(200)
        .end( (err, res) => {
            if (err) {
                console.log(err.message)
                return done(new Error('Supertest encountered an error'))
            }

            expect(res.body.error).to.be.undefined
            expect(res.body.action).to.equal('completed')

            done()
        })
    })
    it('should say Forbidden for non-admin/test role', (done) => {
        apiserver
        .get('/api/admin')
        .set('Authorization', headers.Authorization_NonAdmin)
        .expect('Content-type', /json/)
        .expect(403)
        .end( (err, res) => {
            if (err) {
                console.log(err.message)
                //return done(new Error('Supertest encountered an error'))
            }

            expect(res.body.code).to.equal('Forbidden')

            done()
        })
    })
})
