var supertest   = require('supertest')
var app         = require('../')
var server      = supertest(app)
module.exports  = server
