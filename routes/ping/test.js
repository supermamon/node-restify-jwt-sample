'use strict'

const server    = require('../../test/server')
const headers   = require('../../test/headers')
const chai      = require('chai');
const expect    = require('chai').expect;

describe("ROUTE: /api/ping",function(){

    it("should say OK", (done) => {
        server
        .get("/api/ping")
        .expect("Content-type",/json/)
        .expect(200) // THis is HTTP response
        .end( (err, res) => {
            expect(res.status).to.equal(200);
            expect(!!res.body.error).to.equal(false);
            expect(res.body.ping).to.equal('OK')

            done();
        });
    });

});