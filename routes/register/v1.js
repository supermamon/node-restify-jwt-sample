const MODULE_ID = 'api:register'
const logger    = require('../../utils/logger')
const config    = require('../../config')
const errors    = require('restify-errors')

module.exports = (req, res, next) => {
    logger.info('%s: request received', MODULE_ID)

    let resp = {}
    if (!req.body.name) {
        resp = new errors.BadRequestError('Incomplete registration information.')
    } else if (!req.body.role) {
        resp = new errors.BadRequestError('Incomplete registration information.')
    } else {
        const jwt = require('jsonwebtoken')
        const token = jwt.sign(req.body, config.JWT_SECRET)

        // set all the input data as response and add the token
        resp = req.body
        resp['token']   = token

        logger.info('%s: token generated', MODULE_ID)
    }

    res.send(resp)

    logger.info('%s: response sent', MODULE_ID)
    return next()
}
