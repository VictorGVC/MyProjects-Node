const admin = require('./admin')

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

    app.route('/category')
        .all(app.config.passport.authenticate())
        .post(admin(app.api.category.save))
        .get(app.api.category.get)

    app.route('/category/:id')
        .all(app.config.passport.authenticate())
        .put(admin(app.api.category.save))
        .get(app.api.category.getById)
        .delete(admin(app.api.category.remove))

    app.route('/project')
        .all(app.config.passport.authenticate())
        .post(admin(app.api.project.save))
        .get(admin(app.api.project.get))

    app.route('/project/:id')
        .all(app.config.passport.authenticate())
        .put(admin(app.api.project.save))
        .get(admin(app.api.project.getById))
        .delete(admin(app.api.project.remove))

    // ! (not implemented yet) projects by user
    app.route('/user/:userid/project')
    
    // ! (not implemented yet) projects by user and project id
    app.route('/user/:userid/project/:projectid')

    app.route('category/item/:id')
        .all(app.config.passport.authenticate())
        .delete(admin(app.api.category.removeItem))

    app.route('category/:id/item')
        .all(app.config.passport.authenticate())
        .post(admin(app.api.category.addItem))

    app.route('project/:id/item')
        .all(app.config.passport.authenticate())
        .post(app.api.project.addItem)
        .delete(admin(app.api.project.removeItem))
}