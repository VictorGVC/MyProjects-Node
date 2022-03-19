module.exports = app => {
    // import validations
    const { notExistsError, existsError, notIncrementIdError } = app.api.utils.functions.validation

    // * insert or edit a category
    const save = async (req, res) => {
        // Cloning the body to category object
        const category = { ...req.body }

        if (req.params.id)
            category.id = req.params.id

        try {
            // Validate fields
            notExistsError(category.name, 'Empty name')

            // gets the user by username
            const categoryFromDB = await app.db('category')
                .where({ cat_name: category.name }).first()

            // Validates if already exists
            if (category.id)
                existsError(categoryFromDB, 'Category already exists')

        } catch (error) {
            return res.status(400).send(error)
        }

        // Creating an object with the same key names of the db
        const categoryToDB = app.utils.cloneObjWithDBPrefix(category, 'cat_')

        // edit category
        if (category.id) {
            app.db('category')
                .update(categoryToDB)
                .where({ cat_id: categoryToDB.cat_id })
                .then(_ => res.status(201).send('Category saved!'))
                .catch(err => res.status(500).send(err))
        } else { // create category
            app.db('category')
                .insert(categoryToDB)
                .then(_ => res.status(201).send('Category saved!'))
                .catch(err => res.status(500).send(err))
        }
    }

    // * get all categories
    const get = (req, res) => {
        app.db('category')
            .select('cat_id as id',
                'cat_name as name',
                'cat_description as description'
            ).then(categories => res.json(categories))
            .catch(err => res.status(500).send(err))
    }

    // * get category by id
    const getById = (req, res) => {
        const id = req.params.id
        app.db('category')
            .select('cat_id as id',
                'cat_name as name',
                'cat_description as description'
            ).where({ cat_id: id }).first()
            .then(categories => res.json(categories))
            .catch(err => res.status(500).send(err))
    }

    // * delete category by id
    const remove = async (req, res) => {

        const id = req.params.id

        try {
            // validate item id
            notIncrementIdError(id, 'Invalid id')
            const rowsDeleted = await app.db('category')
                .where({ cat_id: id }).first()
                .del()

            notExistsError(rowsDeleted, 'Category not found')
            res.status(200).send()
        } catch (error) {
            res.status(500).send(error)
        }
    }

    // * add an item to the category
    const addItem = async (req, res) => {

        const id = req.params.id
        // Cloning the body to categoryItem object
        const categoryItem = { ...req.body }

        try {
            // Validate fields
            notExistsError(categoryItem.name, 'Empty name')
            notExistsError(categoryItem.category, 'Invalid item')
        } catch (error) {
            return res.status(400).send(error)
        }

        // get category by id from db
        const itemFromDB = await app.db('category')
            .where({ cat_id: id }).first()

        // validate if category of the item exists
        notExistsError(itemFromDB, 'Invalid category')

        // Creating an object with the same key names of the db
        const categoryItemToDB = app.utils.cloneObjWithDBPrefix(categoryItem, 'it_')

        // save category item
        app.db('category_item')
            .insert(categoryItemToDB)
            .then(_ => res.status(200).send('Item added!'))
            .catch(err => res.status(500).send(err))
    }

    const removeItem = async (req, res) => {

        const id = req.params.id
        
        try {
            //validates item Id
            notIncrementIdError(id, 'Invalid id')
            const rowsDeleted = await app.db('category_item')
                .where({ it_id: id }).first()
                .del()

            notExistsError(rowsDeleted, 'item not found')
            res.status(200).send('Item removed!')
        } catch (error) {
            res.status(500).send(error)
        }
    }

    return { save, get, getById, remove, addItem, removeItem }
}