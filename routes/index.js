module.exports = (server) => {

    // unprotected routes
    require('./ping')(server)

    // protected routes
    require('./whoami')(server)
    require('./home')(server)
    require('./admin')(server)
    

}