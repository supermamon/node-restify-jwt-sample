const MODULE_ID = 'api:hello'
const logger    = require('../../utils/logger')

module.exports = (req, res, next) => {
    logger.info('%s: request received', MODULE_ID)

    res.send({ ping: 'OK' })
    
    logger.info('%s: response sent', MODULE_ID)
    return next()
}
