"use strict";
exports.__esModule = true;
exports.DataValidator = void 0;
var EDataTypes_1 = require("./EDataTypes");
var Validators_1 = require("./Validators");
var DataValidator = function (payload, schemaOptions) {
    var results = [];
    schemaOptions.map(function (schemaOption) {
        var key = schemaOption.key;
        var value = payload[key]; // value from payload
        var hasValue = value !== null && value !== undefined;
        if (schemaOption.required) {
            results.push((0, Validators_1.notEmpty)(value, key));
        }
        if (hasValue) {
            //type checking
            switch (schemaOption.type) {
                case EDataTypes_1.EDataType.STRING:
                    results.push((0, Validators_1.isString)(value, key));
                    break;
                case EDataTypes_1.EDataType.NUMBER:
                    results.push((0, Validators_1.isInt)(value, key));
                    break;
                case EDataTypes_1.EDataType.BOOLEAN:
                    results.push((0, Validators_1.isBool)(value, key));
                    break;
                case EDataTypes_1.EDataType.OBJECT:
                    results.push((0, Validators_1.isObject)(value, key));
                    break;
                default:
                    break;
            }
            //minLength
            if (schemaOption.hasOwnProperty("minLength")) {
                results.push((0, Validators_1.minLength)(value, key, schemaOption.minLength));
            }
            //maxLength
            if (schemaOption.hasOwnProperty("maxLength")) {
                results.push((0, Validators_1.maxLength)(value, key, schemaOption.maxLength));
            }
            //maxValue
            if (schemaOption.hasOwnProperty("maxValue")) {
                results.push((0, Validators_1.maxValue)(value, key, schemaOption.maxValue));
            }
            //minValue
            if (schemaOption.hasOwnProperty("minValue")) {
                results.push((0, Validators_1.minValue)(value, key, schemaOption.minValue));
            }
            //inArray
            if (schemaOption.hasOwnProperty("inArray")) {
                results.push((0, Validators_1.inArray)(value, key, schemaOption.inArray));
            }
            //objHasKeys
            if (schemaOption.hasOwnProperty("objHasKeys")) {
                results.push((0, Validators_1.objHasKeys)(schemaOption.objHasKeys, key, value));
            }
        }
    });
    var filteredResults = results.filter(function (e) { return e !== true; });
    return filteredResults.length == 0 ? true : filteredResults;
};
exports.DataValidator = DataValidator;
