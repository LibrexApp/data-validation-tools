import { EDataType } from "./edata-types";
import { ISchemaOption } from "./ISchemaOption";
import {
  isBool,
  isInt,
  isString,
  notEmpty,
  minLength,
  maxLength,
  minValue,
  maxValue,
} from "./validators";

export const DataValidator = (payload: any, schemaOptions: ISchemaOption[]) => {
  const results = [];

  schemaOptions.map((schemaOption: ISchemaOption) => {
    const key = schemaOption.key;
    const value = payload[key]; // value from payload
    const hasValue = value !== null && value !== undefined;

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
        default:
          break;
      }

      //minLength
      if (schemaOption.hasOwnProperty("minLength")) {
        results.push(minLength(value, key, schemaOption.minLength));
      }

      //maxLength
      if (schemaOption.hasOwnProperty("maxLength")) {
        results.push(maxLength(value, key, schemaOption.maxLength));
      }

      //maxValue
      if (schemaOption.hasOwnProperty("maxValue")) {
        results.push(maxValue(value, key, schemaOption.maxValue));
      }

      //minValue
      if (schemaOption.hasOwnProperty("minValue")) {
        results.push(minValue(value, key, schemaOption.minValue));
      }
    }
  });

  const filteredResults = results.filter((e) => e !== true);
  return filteredResults.length == 0 ? true : filteredResults;
};
