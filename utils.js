// function to add a prefix on each object key to match with db keys
function cloneObjWithDBPrefix(obj, prefix) {
    let newObj = {}
    Object.keys(obj).map(key => {
        newObj[prefix + key] = obj[key]
    })
    return newObj
}

module.exports = { cloneObjWithDBPrefix }