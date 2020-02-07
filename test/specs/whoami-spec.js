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

describe('ROUTE: /api/whoami', function (){
    var request
    before( (done) => {
        request = chai.request(endpoint).keepOpen()
        done()
    })

    it('should say name is ci-test-account', (done) => {
        request
        .get('/api/whoami')
        .set('Authorization', headers.Authorization)
        .end( (err, res) => {
            expect(err).to.be.null
            res.should.have.status(200)

            expect(res.body.name).to.equal('ci-test-account')
            done()
        })
    })
})
