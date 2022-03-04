module.exports = app => {
    // import validations
    const { notEqualsError, notExistsError, existsError } = app.api.utils.functions.validation

    // insert or edit an category
    const save = async (req, res) => {
        // Cloning the body to category object
        const category = { ...req.body }

        if (req.params.id)
            category.id = req.params.id

        try {
            // Validates if 
            notExistsError(category.name, 'Empty name')            

            // Validates whether the category is being created or edited
            const categoryFromDB = await app.db('category')
                .where({ cat_name: category.name }).first()

            // If the category is being created validates if already exists
            if (category.id)
                existsError(categoryFromDB, 'Category already exists')

        } catch (error) {
            return res.status(400).send(error)
        }

        // Creating an object with the same key names of the db
        const categoryToDB = app.utils.cloneObjWithDBPrefix(category, 'cat_')

        console.log(categoryToDB)
        // edit category
        if (category.id) {
            app.db('category')
                .update(categoryToDB)
                .where({ cat_id: categoryToDB.cat_id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else { // create category
            app.db('category')
                .insert(categoryToDB)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
        return res.status(200)
    }

    return { save }
}