module.exports = app => {
    // import validations
    const { notExistsError, existsError, notIncrementIdError } = app.api.utils.functions.validation

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

    // delete project by id
    const remove = (req, res) => {
        const id = req.params.id

        try {
            notIncrementIdError(id, 'Invalid id')
            app.db('project')
                .where({ pro_id: id }).first()
                .del()
            res.status(204).send()
        } catch (error) {
            res.status(500).send(error)
        }
    }

    // * add item to project
    const addItem = async (req, res) => {

        const id = req.params.id

        // Cloning the body to projectItem object
        const projectItem = { ...req.body }

        // get project by id from db
        const projectFromDB = await app.db('project')
            .where({ pro_id: id }).first()

        // get item by id from db
        const itemFromDB = await app.db('category_item')
            .where({ it_id: projectItem.item }).first()

        // validate if item exists
        notExistsError(itemFromDB, 'Invalid item')

        // validate if project of the item exists
        notExistsError(projectFromDB, 'Invalid project')

        // Creating an object with the same key names of the db
        const projectItemToDB = app.utils.cloneObjWithDBPrefix(projectItem, 'pi_')

        // save project item
        app.db('project_item')
            .insert(projectItemToDB)
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
    }

    const removeItem = async (req, res) => {

        const id = req.params.id
        const projectItem = { ...req.body }
        try {

            //validates Ids
            notIncrementIdError(projectItem.item, 'Invalid item')
            notIncrementIdError(id, 'Invalid project')
            const rowsDeleted = await app.db('project_item')
                .where('pi_item', projectItem.item).andWhere('pi_project', id).first()
                .del()

            notExistsError(rowsDeleted, 'item not found')
            res.status(204).send()
        } catch (error) {
            res.status(500).send(error)
        }
    }

    return { save, get, getById, remove, addItem, removeItem }
}