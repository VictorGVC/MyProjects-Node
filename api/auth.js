const { authSecret } = require('../.env')
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt-nodejs')
const user = require('./user')

module.exports = app => {
    const signin = async (req, res) => {
        if (!req.body.email || !req.body.password)
            return res.status(400).send('Enter username and password!')

        const user = await app.db('user')
            .select('us_id as id',
                'us_username as name',
                'us_password as password'
            ).where({ us_username: req.body.username })
            .first()

        if (!user)
            return res.status(400).send('This username is not associated with an account.')

        const isMatch = bcrypt.compareSync(req.body.password, user.password)
        if (!isMatch)
            return res.status(401).send('incorrect password')

        const now = Math.floor(Date.now() / 1000)

        const payload = {
            id: user.id,
            username: user.username,
            admin: user.admin,
            iat: now,
            exp: now + (60 * 60 * 2)
        }

        res.json({
            ...payload,
            token: jwt.encode(payload, authSecret)
        })
    }

    return { signin }
}