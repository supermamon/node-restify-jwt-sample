'use strict'

const server    = require('../../test/server')
const headers   = require('../../test/headers')
const chai      = require('chai');
const expect    = require('chai').expect;

describe("ROUTE: /api/admin",function(){

    it("admin access should say 'completed'", (done) => {

        server
        .get("/api/admin")
        .set('Authorization', headers.Authorization)
        .expect("Content-type",/json/)
        .expect(200) // THis is HTTP response
        .end( (err, res) => {
            // HTTP status should be 200
            expect(res.status).to.equal(200);
            // Error key should be false.
            expect(!!res.body.error).to.equal(false);
            expect(res.body.action).to.equal('completed')

            done();
        });
    });

});