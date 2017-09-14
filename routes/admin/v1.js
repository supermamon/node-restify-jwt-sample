const MODULE_ID = 'api:admin'
const logger    = require('../../utils/logger')

const httpErr   = require('restify-errors')

module.exports = (req, res, next) => {
    logger.info('%s: request received', MODULE_ID)

    // check if authentication has admin access
    if (!req.user.isAdmin) {
        return res.send(new httpErr.ForbiddenError('You don\'t have sufficient priviledges.'))
    }

    res.send({ action: 'completed' })

    logger.info('%s: response sent', MODULE_ID)
    return next()
}
