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

describe('ROUTE: /api/home', function (){
    var request
    before( (done) => {
        request = chai.request(endpoint).keepOpen()
        done()
    })

    it('v1 should say hello ci-test-account', (done) => {
        request
        .get('/api/home')
        .set('Authorization', headers.Authorization)
        .set('Accept-Version', '~1')
        .send()
        .end( (err, res) => {
            expect(err).to.be.null
            res.should.have.status(200)
            expect(res.body.hello).to.equal('ci-test-account')
            done()
        })
    })
    it('v2 should say return version:2', (done) => {
        request
        .get('/api/home')
        .set('Authorization', headers.Authorization)
        .set('Accept-Version', '~2')
        .end( (err, res) => {
            expect(err).to.be.null
            res.should.have.status(200)
            expect(res.body.version).to.equal(2)
            done()
        })
    })
})
