module.exports = app => {
    app.route('/user')
        .post(app.api.user.save)
        .get(app.api.user.get)

    app.route('/user/:id')
        .put(app.api.user.save)
        .get(app.api.user.getById)
        .delete(app.api.user.remove)

    app.route('/category')
        .post(app.api.category.save)
        .get(app.api.category.get)


    app.route('/category/:id')
        .put(app.api.category.save)
        .get(app.api.category.getById)
        .delete(app.api.category.remove)


    app.route('/project')
        .post(app.api.project.save)
        .get(app.api.project.get)

    app.route('/project/:id')
        .put(app.api.project.save)
        .get(app.api.project.getById)
        .delete(app.api.project.remove)

    app.route('category/:id/item')
        .post(app.api.category.addItem)

    app.route('category/item/:id')
        .delete(app.api.category.removeItem)

    app.route('project/:id/item')
        .post(app.api.project.addItem)
        .delete(app.api.project.removeItem)
}