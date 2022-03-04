// load modules
const app = require('express')()
const consign = require('consign')
const db = require('./config/db')
const utils = require('./api/utils/functions/utils')

app.utils = utils
app.db = db

// load modules with consign
consign()
    .then('./config/middlewares.js')
    .then('./api/utils/functions/validation.js')
    .then('./api/user.js')
    .then('./config/routes.js')
    .into(app)

app.listen(3000, () => {
    console.log('Backend executando...')
})
