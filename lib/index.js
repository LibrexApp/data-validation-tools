"use strict";
exports.__esModule = true;
exports.DataValidator = void 0;
var edata_types_1 = require("./edata-types");
var validators_1 = require("./validators");
var DataValidator = function (payload, schemaOptions) {
    var results = [];
    schemaOptions.map(function (schemaOption) {
        var key = schemaOption.key;
        var value = payload[key]; // value from payload
        if (schemaOption.required) {
            results.push((0, validators_1.notEmpty)(value, key));
        }
        if (value !== null && value !== undefined) {
            //type checking
            switch (schemaOption.type) {
                case edata_types_1.EDataType.STRING:
                    results.push((0, validators_1.isString)(value, key));
                    break;
                case edata_types_1.EDataType.NUMBER:
                    results.push((0, validators_1.isInt)(value, key));
                    break;
                case edata_types_1.EDataType.BOOLEAN:
                    results.push((0, validators_1.isBool)(value, key));
                    break;
                default:
                    break;
            }
        }
    });
    var filteredResults = results.filter(function (e) { return e !== true; });
    return filteredResults.length == 0 ? true : filteredResults;
};
exports.DataValidator = DataValidator;
var payload = {
    name: "andrew",
    age: 21
};
var PersonSchema = [
    {
        key: "name",
        required: true,
        type: edata_types_1.EDataType.STRING
    },
    {
        key: "age",
        required: true,
        type: edata_types_1.EDataType.NUMBER
    },
    {
        key: "gender",
        required: false,
        type: edata_types_1.EDataType.STRING
    },
    {
        key: "alive",
        required: false,
        type: edata_types_1.EDataType.BOOLEAN
    },
];
var result = (0, exports.DataValidator)(payload, PersonSchema);
console.log("RESULT", result);
