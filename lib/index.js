"use strict";
exports.__esModule = true;
exports.DataValidator = void 0;
var EDataTypes_1 = require("./EDataTypes");
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
                case EDataTypes_1.EDataType.STRING:
                    results.push(isString(value, key));
                    break;
                case EDataTypes_1.EDataType.NUMBER:
                    results.push(isInt(value, key));
                    break;
                case EDataTypes_1.EDataType.BOOLEAN:
                    results.push(isBool(value, key));
                    break;
                case EDataTypes_1.EDataType.OBJECT:
                    results.push(isObject(value, key));
                    break;
                default:
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
