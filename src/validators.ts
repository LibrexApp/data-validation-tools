export function notEmpty(x, key) {
  return x !== null && typeof x !== undefined && x !== undefined
    ? true
    : `${key} is required`;
}

export function isString(x, key) {
  return typeof x === "string" ? true : `${key} must be a string`;
}

export function isInt(x, key) {
  return typeof x === "number" ? true : `${key} must be a number`;
}

export function isBool(x, key) {
  return typeof x === "boolean" ? true : `${key} must be a boolean`;
}

export function isObject(x, key) {
  return typeof x === "object" ? true : `${key} must be an object`;
}

export function maxLength(x, key, max) {
  return x?.length <= max ? true : `${key} must be ${max} characters or less`;
}

export function minLength(x, key, min) {
  return x?.length >= min ? true : `${key} must be ${min} characters or more`;
}

export function maxValue(x, key, max) {
  return x <= max ? true : `${key} must be ${max} or less`;
}

export function minValue(x, key, min) {
  return x >= min ? true : `${key} must be ${min} or more`;
}
