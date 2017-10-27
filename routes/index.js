module.exports = (server) => {
    // unprotected routes
    require('./ping')(server)
    require('./register')(server)

    // protected routes
    require('./whoami')(server)
    require('./home')(server)
    require('./admin')(server)
}
