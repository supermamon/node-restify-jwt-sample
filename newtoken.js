const config    = require('./config')

var payload = process.argv.slice(2)

if (payload.length == 0) {
    console.error('payload not provided')
    process.exit(1)
}

payload = payload.join(' ')

try {
    payload = JSON.parse(payload)
} catch (e) {
    console.error(e.message)
    process.exit(1)
}

var jwt = require('jsonwebtoken');
var token = jwt.sign(payload, config.JWT_SECRET);

console.log(token)

/*
$ node newtoken.js '{ "name": "Johnny Appleseed", "isAdmin": true }'
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9obm55IEFwcGxlc2VlZCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTUwNTQwMTk5Nn0.Egj7FOP4Zddc1fGRS_v6xoRqNqeZxbtB7n_VopVQuJ4

node newtoken.js '{ "name": "Tim Cook", "isAdmin": false }'
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGltIENvb2siLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNTA1NDAyNTYxfQ.D5X-WvMVTfx7oh3RAnnm-lKFLGGiIFV-5FWmz9X7Hfg

*/