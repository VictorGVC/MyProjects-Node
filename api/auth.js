const { authSecret } = require('../.env')
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt-nodejs')
const user = require('./user')

module.exports = app => {

    const generateToken = payload => {
        return {
            ...payload,
            token: jwt.encode(payload, authSecret)
        }
    }

    const signin = async (req, res) => {
        if (!req.body.username || !req.body.password)
            return res.status(400).send('Enter username and password!')

        const user = await app.db('user')
            .select('us_id as id',
                'us_username as username',
                'us_password as password',
                'us_admin as admin'
            ).where({ us_username: req.body.username })
            .first()

        if (!user)
            return res.status(400).send('This username is not associated with an account.')

        const isMatch = bcrypt.compareSync(req.body.password, user.password)
        if (!isMatch)
            return res.status(401).send('incorrect password')

        const now = Math.floor(Date.now() / 1000)

        const twoHours = (60 * 60 * 2)

        const payload = {
            id: user.id,
            username: user.username,
            admin: user.admin,
            iat: now,
            exp: now + twoHours
        }

        res.json(generateToken(payload))
    }

    const validateToken = async (req, res) => {
        const userData = req.body || null

        try {
            if(userData) {
                const token = jwt.decode(userData.token, authSecret)
                if(new Date(token.exp * 1000) > new Date())
                    return res.send(true)
            }
        } catch (error) {
            res.send('Your token has a problem!')
        }

        res.send(false)
    }

    return { signin, validateToken }
}