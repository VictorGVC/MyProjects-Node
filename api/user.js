const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    // import validations
    const {notEqualsError, notExistsError, existsError} = app.api.validation
    
    const encryptPassword = password => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)
    }

    // insert or edit an user
    const save = (req, res) => {
        const user = { ...req.body }
        if(req.params.id) 
            user.user_id = req.params.id
        
        try {
            
        } catch (error) {
            
        }
    }

    return {save}
}