const MODULE_ID = 'api:home:v2'
const logger    = require('../../utils/logger')

module.exports = (req, res, next) => {
    logger.info('%s: request received', MODULE_ID)

    res.send({ welcome: req.user.name })

    logger.info('%s: response sent', MODULE_ID)
    return next()
}
