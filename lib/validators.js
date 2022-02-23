"use strict";
exports.__esModule = true;
exports.minValue = exports.maxValue = exports.minLength = exports.maxLength = exports.isObject = exports.isBool = exports.isInt = exports.isString = exports.notEmpty = void 0;
function notEmpty(x, key) {
    return x !== null && typeof x !== undefined && x !== undefined
        ? true
        : "".concat(key, " is required");
}
exports.notEmpty = notEmpty;
function isString(x, key) {
    return typeof x === "string" ? true : "".concat(key, " must be a string");
}
exports.isString = isString;
function isInt(x, key) {
    return typeof x === "number" ? true : "".concat(key, " must be a number");
}
exports.isInt = isInt;
function isBool(x, key) {
    return typeof x === "boolean" ? true : "".concat(key, " must be a boolean");
}
exports.isBool = isBool;
function isObject(x, key) {
    return typeof x === "object" ? true : "".concat(key, " must be an object");
}
exports.isObject = isObject;
function maxLength(x, key, max) {
    return (x === null || x === void 0 ? void 0 : x.length) <= max ? true : "".concat(key, " must be ").concat(max, " characters or less");
}
exports.maxLength = maxLength;
function minLength(x, key, min) {
    return (x === null || x === void 0 ? void 0 : x.length) >= min ? true : "".concat(key, " must be ").concat(min, " characters or more");
}
exports.minLength = minLength;
function maxValue(x, key, max) {
    return x <= max ? true : "".concat(key, " must be ").concat(max, " or less");
}
exports.maxValue = maxValue;
function minValue(x, key, min) {
    return x >= min ? true : "".concat(key, " must be ").concat(min, " or more");
}
exports.minValue = minValue;
