'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var EDataType;
(function (EDataType) {
    EDataType["STRING"] = "string";
    EDataType["NUMBER"] = "number";
    EDataType["BOOLEAN"] = "boolean";
    EDataType["OBJECT"] = "object";
    EDataType["ANY"] = "any";
})(EDataType || (EDataType = {}));

function notEmpty(x, key) {
    return x === null ||
        typeof x === undefined ||
        x === undefined ||
        (typeof x === "string" && x.trim() == "")
        ? "".concat(key, " is required")
        : true;
}
function isString(x, key) {
    return typeof x === "string" ? true : "".concat(key, " must be a string");
}
function isInt(x, key) {
    return typeof x === "number" ? true : "".concat(key, " must be a number");
}
function isBool(x, key) {
    return typeof x === "boolean" ? true : "".concat(key, " must be a boolean");
}
function isObject(x, key) {
    return typeof x === "object" ? true : "".concat(key, " must be an object");
}
function maxLength(x, key, max) {
    return (x === null || x === void 0 ? void 0 : x.length) <= max ? true : "".concat(key, " must be ").concat(max, " characters or less");
}
function minLength(x, key, min) {
    return (x === null || x === void 0 ? void 0 : x.length) >= min ? true : "".concat(key, " must be ").concat(min, " characters or more");
}
function maxValue(x, key, max) {
    return x <= max ? true : "".concat(key, " must be ").concat(max, " or less");
}
function minValue(x, key, min) {
    return x >= min ? true : "".concat(key, " must be ").concat(min, " or more");
}
function inArray(x, key, array) {
    return array.includes(x)
        ? true
        : "".concat(key, " must be one of the following: ").concat(array.join(", "));
}
//if we want to check if an object has 1 or more required keys
//x = ['color', 'length']
//obj = hair: {color: 'brown', length: 'short'}
function objHasKeys(x, key, obj) {
    var errors = x
        .map(function (e) {
        return obj.hasOwnProperty(e)
            ? true
            : "".concat(key, " must have the following property: ").concat(e);
    })
        .filter(function (e) { return e !== true; });
    return errors.length == 0 ? true : errors;
}

var DataValidator = function (payload, schemaOptions) {
    var results = [];
    schemaOptions.map(function (schemaOption) {
        var key = schemaOption.key;
        var value = payload[key]; // value from payload
        var hasValue = value !== null && value !== undefined;
        if (schemaOption.required) {
            results.push(notEmpty(value, key));
        }
        if (hasValue) {
            //type checking
            switch (schemaOption.type) {
                case EDataType.STRING:
                    results.push(isString(value, key));
                    break;
                case EDataType.NUMBER:
                    results.push(isInt(value, key));
                    break;
                case EDataType.BOOLEAN:
                    results.push(isBool(value, key));
                    break;
                case EDataType.OBJECT:
                    results.push(isObject(value, key));
                    break;
            }
            //minLength
            if (schemaOption.hasOwnProperty('minLength')) {
                results.push(minLength(value, key, schemaOption.minLength));
            }
            //maxLength
            if (schemaOption.hasOwnProperty('maxLength')) {
                results.push(maxLength(value, key, schemaOption.maxLength));
            }
            //maxValue
            if (schemaOption.hasOwnProperty('maxValue')) {
                results.push(maxValue(value, key, schemaOption.maxValue));
            }
            //minValue
            if (schemaOption.hasOwnProperty('minValue')) {
                results.push(minValue(value, key, schemaOption.minValue));
            }
            //inArray
            if (schemaOption.hasOwnProperty('inArray')) {
                results.push(inArray(value, key, schemaOption.inArray));
            }
            //objHasKeys
            if (schemaOption.hasOwnProperty('objHasKeys')) {
                results.push(objHasKeys(schemaOption.objHasKeys, key, value));
            }
            // customValidator function
            if (schemaOption.hasOwnProperty('customValidator')) {
                results.push(schemaOption.customValidator(value, key));
            }
        }
    });
    var filteredResults = results.filter(function (e) { return e !== true; });
    return filteredResults.length == 0 ? true : filteredResults;
};

exports.DataValidator = DataValidator;
