module.exports = app => {
    // import validations
    const { notEqualsError, notExistsError, existsError } = app.api.utils.functions.validation

    // Insert or update a project
    const save = async (req, res) => {
        // Cloning the body to project object
        const project = { ...req.body }

        if (req.params.id)
            project.id = req.params.id

        try {
            // Validate fields
            notExistsError(project.name, 'Empty name')
            notExistsError(project.user, 'Invalid user')

            // validate if user of the project exists
            const projectFromDB = await app.db('user')
                .where({ us_id: project.user }).first()

            notExistsError(projectFromDB, 'Invalid user')

        } catch (error) {
            return res.status(400).send(error)
        }

        // Creating an object with the same key names of the db
        const projectToDB = app.utils.cloneObjWithDBPrefix(project, 'pro_')

        // edit project
        if (project.id) {
            app.db('project')
                .update(projectToDB)
                .where({ pro_id: projectToDB.pro_id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else { // create project
            app.db('project')
                .insert(projectToDB)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    // get all projects
    const get = (req, res) => {
        app.db('project')
            .select('pro_id as id',
                'pro_name as name',
                'pro_description as description',
                'pro_readme as readme',
                'pro_link as link',
                'pro_user as user'
            ).then(projects => res.json(projects))
            .catch(err => res.status(500).send(err))
    }

    // get project by id
    const getById = (req, res) => {
        const id = req.params.id
        app.db('project')
            .select('pro_id as id',
                'pro_name as name',
                'pro_description as description',
                'pro_readme as readme',
                'pro_link as link',
                'pro_user as user'
            ).where({ pro_id: id }).first()
            .then(projects => res.json(projects))
            .catch(err => res.status(500).send(err))
    }

    return { save, get, getById }
}