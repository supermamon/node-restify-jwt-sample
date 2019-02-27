const MODULE_ID = 'api:admin'
const logger    = require('../../utils/logger')

const httpErr   = require('restify-errors')

module.exports = (req, res, next) => {
    logger.info('%s: request received', MODULE_ID)
    logger.debug(`${MODULE_ID}: user`, req.user)

    // check if authentication has admin access
    //   for CI/CD purposes, also allow `test` role to access the admin route
    //   this can be expanded to check for NODE_ENV to prevent access in production
    if (!(req.user.role === 'admin' || req.user.role === 'test')) {
        return res.send(new httpErr.ForbiddenError('You don\'t have sufficient priviledges.'))
    }

    res.send({ action: 'completed' })

    logger.info('%s: response sent', MODULE_ID)
    return next()
}
