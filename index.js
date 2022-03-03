// load modules
const app = require('express')()
const consign = require('consign')
const db = require('./config/db')
const utils = require('./utils')

app.utils = utils
app.db = db

// load modules with consign
consign()
    .then('./config/middlewares.js')
    .then('./api/validation.js')
    .then('./api/user.js')
    .then('./config/routes.js')
    .into(app)

app.listen(3000, () => {
    console.log('Backend executando...')
})
