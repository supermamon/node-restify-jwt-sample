const config    = require('../../config')

module.exports = (server) => {
    server.get({ path: config.basePath('/ping'),
        version: '1.0.0' }, require('./v1'))
}
