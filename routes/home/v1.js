const MODULE_ID = 'api:home:v1'
const logger    = require('../../utils/logger')

module.exports = (req, res, next) => {
    logger.info('%s: request received', MODULE_ID)

    // get the user's name from the JWT
    res.send({ hello: req.user.name })

    logger.info('%s: response sent', MODULE_ID)
    return next()
}
