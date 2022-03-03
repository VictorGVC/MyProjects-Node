const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    // import validations
    const { notEqualsError, notExistsError, existsError } = app.api.validation

    const encryptPassword = password => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)
    }

    // insert or edit an user
    const save = async (req, res) => {
        // Cloning the body to user variable
        const user = { ...req.body }

        if (req.params.id)
            user.id = req.params.id

        try {
            // Validates if 
            notExistsError(user.username, 'Empty username')
            notExistsError(user.password, 'Empty password')
            notExistsError(user.confirmPassword, 'Invalid confirmation password')
            notEqualsError(user.password, user.confirmPassword, 'Password confirmation does not match')

            // Validates whether the user is being created or edited
            const userFromDB = await app.db('user')
                .where({ us_username: user.username }).first()

            // If the user is being created validates if the username exists
            if (user.id)
                existsError(userFromDB, 'User already exists')

        } catch (error) {
            return res.status(400).send(error)
        }

        user.password = encryptPassword(user.password)
        // Delete password confirmation for safety db transaction
        delete user.confirmPassword

        // Creating an object with the same key names of the db
        const userToDB = app.utils.cloneObjWithDBPrefix(user, 'us_')

        // edit user
        if (user.id) {
            app.db('user')
                .update(userToDB)
                .where({ us_id: userToDB.us_id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
        // create user
        else {
            app.db('user')
                .insert(userToDB)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
        return res.status(200)
    }

    const get = (req, res) => {
        return res.status(400).send('aoba')
    }

    return { save, get }
}