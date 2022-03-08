module.exports = app => {

    // Validates if the value exists, if not, throw an message error 
    function notExistsError(value, msg) {
        if (!value) throw msg
        if (Array.isArray(value) && value.length === 0) throw msg
        if (typeof value === 'string' && !value.trim()) throw msg
    }

    // validates if the value do not exists, if exists, throw an message error 
    function existsError(value, msg) {
        try {
            notExistsError(value, msg)
        } catch (msg) {
            return
        }
        throw msg
    }

    // validates if the valueA is equal to valueB, if it's not, throw an message error
    function notEqualsError(valueA, valueB, msg) {
        if (valueA !== valueB) throw msg
    }

    function notIncrementIdError(value, msg) {
        
        if(!value || isNaN(value) || value <= 0)
            throw msg
    }

    return { notEqualsError, notExistsError, existsError, notIncrementIdError }
}