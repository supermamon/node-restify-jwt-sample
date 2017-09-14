
// this will be used to prefix route paths.
// a workaround since restify does not have this yet
const API_ROOT  = '/api'

const urljoin   = require('url-join')

module.exports = {
    LOG_LEVEL   : process.env['LOG_LEVEL'] || 'info',
    PORT        : process.env['PORT'] || 8080,

    // key to generate/verify JWT
    JWT_SECRET  : 'some-secret',

    // will be used to building route paths
    basePath    : function(path) {
        return urljoin(API_ROOT, path);
    }
    
}