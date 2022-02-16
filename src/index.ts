import { EDataType } from './edata-types';
import { ISchemaOption } from './ISchemaOption';
import { isBool, isInt, isString, notEmpty } from './validators';

export const DataValidator = (payload: any, schemaOptions: ISchemaOption[]) => {
    const results = [];

    schemaOptions.map((schemaOption: ISchemaOption) => {
        const key = schemaOption.key;
        const value = payload[key]; // value from payload

        if (schemaOption.required) {
            results.push(notEmpty(value, key));
        }

        if (value !== null && value !== undefined) {
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
        }
    });

    const filteredResults = results.filter((e) => e !== true);
    return filteredResults.length == 0 ? true : filteredResults;
};
