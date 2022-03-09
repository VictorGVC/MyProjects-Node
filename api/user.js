const bcrypt = require('bcrypt-nodejs')
const { use } = require('passport/lib')

module.exports = app => {
    // import validations
    const { notEqualsError, notExistsError, existsError } = app.api.utils.functions.validation

    const encryptPassword = password => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)
    }

    // insert or edit an user
    const save = async (req, res) => {
        // Cloning the body to user object
        const user = { ...req.body }

        if (req.params.id)
            user.id = req.params.id

        if (!req.originalUrl.startsWith('/user'))
            user.admin = false
        if (!req.user || !req.user.admin)
            user.admin = false

        try {
            // Validate fields
            notExistsError(user.username, 'Empty username')
            notExistsError(user.password, 'Empty password')
            notExistsError(user.confirmPassword, 'Invalid confirmation password')
            notEqualsError(user.password, user.confirmPassword, 'Password confirmation does not match')

            // gets the user by username
            const userFromDB = await app.db('user')
                .where({ us_username: user.username }).first()


            // If the user is being created validates if the username exists
            if (user.username)
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
        } else { // create user
            app.db('user')
                .insert(userToDB)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    // get all users
    const get = (req, res) => {
        app.db('user')
            .select('us_id as id',
                'us_username as username',
                'us_admin as admin',
                'us_github as github',
                'us_linkedin as linkedin',
                'us_photo as photo')
            .then(users => res.json(users))
            .catch(err => res.status(500).send(err))
    }

    // get user by id
    const getById = (req, res) => {
        const id = req.params.id
        app.db('user')
            .select('us_id as id',
                'us_username as username',
                'us_admin as admin',
                'us_github as github',
                'us_linkedin as linkedin',
                'us_photo as photo')
            .where({ us_id: id }).first()
            .then(user => res.json(user))
            .catch(err => res.status(500).send(err))
    }

    // delete user by id
    const remove = (req, res) => {
        const id = req.params.id

        try {
            notIncrementIdError(id, 'Invalid id')
            app.db('user')
                .where({ us_id: id }).first()
                .del()
            res.status(204).send()
        } catch (error) {
            res.status(500).send(error)
        }
    }

    const validateUser = (tokenUser, paramUser) => tokenUser.id == paramUser

    // get projects from user
    const getProjects = (req, res) => {

    }

    // get project from user by id
    const getProjectById = (req, res) => {

    }

    // delete project from user
    const removeProject = (req, res) => {

    }

    return { save, get, getById, remove, getProjectById, getProjects, removeProject }
}