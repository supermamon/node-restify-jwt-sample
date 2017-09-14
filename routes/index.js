module.exports = (server) => {

    // unprotected routes
    require('./ping')(server)

    // protected routes
    require('./home')(server)
    require('./admin')(server)
    

}