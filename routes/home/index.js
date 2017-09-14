const config    = require('../../config')

module.exports = (server) => {
    var PATH = config.basePath('/home/')
    server.get({ path: PATH,
        version: '1.0.0' }, require('./v1'))
    server.get({ path: PATH,
        version: '2.0.0' }, require('./v2'))
}
