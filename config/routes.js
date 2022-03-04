module.exports = app => {
    app.route('/user')
        .post(app.api.user.save)
        .get(app.api.user.get)
        
    app.route('/user/:id')
        .post(app.api.user.save)
        .get(app.api.user.getById)
        .delete(app.api.user.remove)

    app.route('/category')
        .post(app.api.category.save)
    
    app.route('/category/:id')
        .post(app.api.category.save)
}