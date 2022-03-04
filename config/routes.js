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
}