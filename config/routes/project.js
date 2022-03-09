const admin = require('../admin')

module.exports = app => {
    app.route('/project')
        .all(app.config.passport.authenticate())
        .post(admin(app.api.project.save))
        .get(admin(app.api.project.get))

    app.route('/project/:id')
        .all(app.config.passport.authenticate())
        .put(admin(app.api.project.save))
        .get(admin(app.api.project.getById))
        .delete(admin(app.api.project.remove))

    app.route('project/:id/item')
        .all(app.config.passport.authenticate())
        .post(app.api.project.addItem)
        .delete(admin(app.api.project.removeItem))
}