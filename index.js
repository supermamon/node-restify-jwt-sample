const MODULE_ID = 'app:main'
const logger    = require('m-logger')
const config    = require('./config')

logger.info('%s: initializing', MODULE_ID)

const jwt     = require('restify-jwt-community')
const restify = require('restify')
const plugins = require('restify').plugins
const server  = restify.createServer()

server.pre(restify.pre.sanitizePath())

server.use(plugins.bodyParser())

logger.verbose('securing with jwt')
// Auth
var jwtConfig = {
    secret: config.JWT_SECRET
}

// secure all routes. except /ping
server.use(jwt(jwtConfig).unless({
    path: [
        config.basePath('/ping'),
        config.basePath('/register')
    ]
}))

// Routes
logger.verbose('loading routes')
require('./routes')(server)

// Serve
server.listen(config.PORT)
logger.info('%s: ready. listening on PORT %d', MODULE_ID, config.PORT)

module.exports = server

