const config    = require('../../config')
const restify   = require('restify')

// just to demo a route with multiple versions
module.exports = (server) => {
    var PATH = config.basePath('/home')
    server.get(
        PATH,
        restify.plugins.conditionalHandler([
            {
                version: '1.0.0',
                handler: require('./v1')
            },
            {
                version: '2.0.0',
                handler: require('./v2')
            }
        ])
    )
}
