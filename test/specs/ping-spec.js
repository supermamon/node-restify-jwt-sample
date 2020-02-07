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

describe('ROUTE: /api/ping', () => {
    var request
    before( (done) => {
        request = chai.request(endpoint).keepOpen()
        done()
    })

    it('should say OK', (done) => {
        request
        .get('/api/ping')
        .end( (err, res) => {
            expect(err).to.be.null
            res.should.have.status(200)
            expect(res.body.ping).to.equal('OK')
            done()
        })
    })
})
