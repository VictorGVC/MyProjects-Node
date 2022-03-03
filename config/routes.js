module.exports = app => {
    app.route('/users')
        .post(app.api.user.save)
    
    app.route('/users')
        .get(app.api.user.get)
}