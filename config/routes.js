module.exports = app => {
    app.post('/signup', app.api.user.save)
    app.post('/signin', app.api.auth.signin)
    app.post('/validateToken', app.api.auth.validateToken)

    app.route('/user')
        .all(app.config.passport.authenticate())
        .post(app.api.user.save)
        .get(app.api.user.get)

    app.route('/user/:id')
        .all(app.config.passport.authenticate())
        .put(app.api.user.save)
        .get(app.api.user.getById)
        .delete(app.api.user.remove)

    app.route('/category')
        .all(app.config.passport.authenticate())
        .post(app.api.category.save)
        .get(app.api.category.get)

    app.route('/category/:id')
        .all(app.config.passport.authenticate())
        .put(app.api.category.save)
        .get(app.api.category.getById)
        .delete(app.api.category.remove)


    app.route('/project')
        .all(app.config.passport.authenticate())
        .post(app.api.project.save)
        .get(app.api.project.get)

    app.route('/project/:id')
        .all(app.config.passport.authenticate())
        .put(app.api.project.save)
        .get(app.api.project.getById)
        .delete(app.api.project.remove)

    app.route('category/:id/item')
        .all(app.config.passport.authenticate())
        .post(app.api.category.addItem)

    app.route('category/item/:id')
        .all(app.config.passport.authenticate())
        .delete(app.api.category.removeItem)

    app.route('project/:id/item')
        .all(app.config.passport.authenticate())
        .post(app.api.project.addItem)
        .delete(app.api.project.removeItem)
}