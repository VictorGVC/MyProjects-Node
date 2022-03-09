const admin = require('../config/admin')

module.exports = app => {
    app.post('/signup', app.api.user.save)
    app.post('/signin', app.api.auth.signin)
    app.post('/validateToken', app.api.auth.validateToken)

    app.route('/user')
        .all(app.config.passport.authenticate())
        .post(admin(app.api.user.save))
        .get(admin(app.api.user.get))

    app.route('/user/:id')
        .all(app.config.passport.authenticate())
        .put(app.api.user.save)
        .get(app.api.user.getById)
        .delete(admin(app.api.user.remove))

    // ! (not implemented yet) projects by user
    app.route('/user/:userid/project')
        .all(app.config.passport.authenticate())
        .post(app.api.user.save)
        .get(app.api.user.get)

    // ! (not implemented yet) projects by user and project id
    app.route('/user/:userid/project/:projectid')
        .all(app.config.passport.authenticate())
        .post(app.api.user.save)
        .get(app.api.user.get)
}