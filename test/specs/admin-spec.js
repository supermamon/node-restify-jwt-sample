'use strict'

require('../../')
const config    = require('../../config')
const headers   = require('../../test/headers')
const chai      = require('chai')
const chaiHttp  = require('chai-http')

const expect    = chai.expect
chai.should()
chai.use(chaiHttp)

const PORT = config.PORT
const HOST = config.HOST
const endpoint = `http://${HOST}:${PORT}`

describe('ROUTE: /api/admin', () => {
    var request
    before( (done) => {
        request = chai.request(endpoint).keepOpen()
        done()
    })

    it('should say action=completed for admin/test', (done) => {
        request
        .get('/api/admin')
        .set('Authorization', headers.Authorization)
        .send()
        .end( (err, res) => {
            expect(err).to.be.null
            res.should.have.status(200)
            expect(res.body.action).to.equal('completed')
            done()
        })
    })
    it('should say Forbidden for non-admin/test role', (done) => {
        request
        .get('/api/admin')
        .set('Authorization', headers.Authorization_NonAdmin)
        .send()
        .end( (err, res) => {
            expect(err).to.be.null
            expect(res.status).to.be.equal(403)
            expect(res.body.code).to.equal('Forbidden')
            done()
        })
    })
})
