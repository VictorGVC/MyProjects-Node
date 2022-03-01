module.exports = app => {
        function notExistsError(value, msg) {
        if(!value) throw msg
        if(Array.isArray(value) && value.length === 0) throw msg
        if(typeof value === 'string' && !value.trim()) throw msg
    }

    function existsError(value, msg) {
        try {
            existsError(value, msg)
        } catch(msg) {
            return
        }
        throw msg
    }

    function notEqualsError(valueA, valueB, msg) {
        if(valueA !== valueB) throw msg
    }

    return {notEqualsError, notExistsError, existsError}
}