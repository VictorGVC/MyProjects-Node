// load modules
const app = require('express')()
const consign = require('consign')
const db = require('./config/db')
const utils = require('./api/utils/functions/utils')

app.utils = utils
app.db = db

// load modules with consign
consign()
    .include('./config/passport.js')
    .then('./config/middlewares.js')
    .then('./api/utils/functions/validation.js')
    .then('./api/user.js')
    .then('./api/category.js')
    .then('./api/project.js')
    .then('./api/auth.js')
    .then('./routes')
    .into(app)

app.listen(process.env.PORT || 3000, () => {
    console.log('Running Backend...')
})