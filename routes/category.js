const admin = require('../config/admin')

module.exports = app => {
    app.route('/category')
        .all(app.config.passport.authenticate())
        .post(admin(app.api.category.save))
        .get(app.api.category.get)

    app.route('/category/:id')
        .all(app.config.passport.authenticate())
        .put(admin(app.api.category.save))
        .get(app.api.category.getById)
        .delete(admin(app.api.category.remove))

    app.route('category/item/:id')
        .all(app.config.passport.authenticate())
        .delete(admin(app.api.category.removeItem))

    app.route('category/:id/item')
        .all(app.config.passport.authenticate())
        .post(admin(app.api.category.addItem))
}