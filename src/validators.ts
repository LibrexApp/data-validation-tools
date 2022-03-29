export function notEmpty(x, key) {
    return x === null ||
        typeof x === undefined ||
        x === undefined ||
        (typeof x === 'object' && Object.keys(x).length === 0) ||
        (typeof x === 'string' && x.trim() == '')
        ? `${key} is required`
        : true
}

export function isString(x, key) {
    return typeof x === 'string' ? true : `${key} must be a string`
}

export function isInt(x, key) {
    return typeof x === 'number' ? true : `${key} must be a number`
}

export function isBool(x, key) {
    return typeof x === 'boolean' ? true : `${key} must be a boolean`
}

export function isObject(x, key) {
    return typeof x === 'object' ? true : `${key} must be an object`
}

export function isArray(x, key) {
    return Array.isArray(x) ? true : `${key} must be an array`
}

export function maxLength(x, key, max) {
    return x?.length <= max ? true : `${key} must be ${max} characters or less`
}

export function minLength(x, key, min) {
    return x?.length >= min ? true : `${key} must be ${min} characters or more`
}

export function maxValue(x, key, max) {
    return x <= max ? true : `${key} must be ${max} or less`
}

export function minValue(x, key, min) {
    return x >= min ? true : `${key} must be ${min} or more`
}

export function inArray(x, key, array) {
    return array.includes(x)
        ? true
        : `${key} must be one of the following: ${array.join(', ')}`
}

//if we want to check if an object has 1 or more required keys
//x = ['color', 'length']
//obj = hair: {color: 'brown', length: 'short'}
export function objHasKeys(x, key, obj) {
    let errors = x
        .map((e) => {
            return obj.hasOwnProperty(e)
                ? true
                : `${key} must have the following property: ${e}`
        })
        .filter((e) => e !== true)

    return errors.length == 0 ? true : errors
}

export function checkArrayValueTypes(x, key, arrayValueType) {
    let errors = x
        .map((e) => {
            return typeof x === arrayValueType
        })
        .filter((e) => e !== true)

    return errors.length == 0
        ? true
        : `All indexes of ${key} must be a ${arrayValueType}`
}
