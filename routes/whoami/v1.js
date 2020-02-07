const MODULE_ID = 'api:whoami'
const logger    = require('m-logger')

module.exports = (req, res, next) => {
    logger.info('%s: request received', MODULE_ID)

    res.send(req.user)

    logger.info('%s: response sent', MODULE_ID)
    return next()
}
