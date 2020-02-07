const MODULE_ID = 'm:m-logger'
const winston   = require('winston')

const mlogger = winston.createLogger({
    level: process.env['LOG_LEVEL'] || 'info',
    transports: [
        new (winston.transports.Console)({
            format: winston.format.combine(
                winston.format.splat(),
                winston.format.colorize(),
                winston.format.simple()
            )
        })
    ],
    exitOnError: false
})

mlogger.info('%s started', MODULE_ID)
mlogger.info('%s LOG_LEVEL = %s', MODULE_ID, process.env['LOG_LEVEL'] || 'info')

module.exports = mlogger
