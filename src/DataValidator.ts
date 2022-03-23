import { EDataType } from './EDataTypes'
import { ISchemaOption } from './ISchemaOption'
import {
    inArray,
    isArray,
    isBool,
    isInt,
    isObject,
    isString,
    maxLength,
    maxValue,
    minLength,
    minValue,
    notEmpty,
    objHasKeys,
} from './validators'

export const DataValidator = (payload: any, schemaOptions: ISchemaOption[]) => {
    const results = []

    schemaOptions.map((schemaOption: ISchemaOption) => {
        const key = schemaOption.key
        const value = payload[key] // value from payload
        const hasValue = value !== null && value !== undefined

        if (schemaOption.required) {
            results.push(notEmpty(value, key))
        }

        if (hasValue) {
            //type checking
            switch (schemaOption.type) {
                case EDataType.STRING:
                    results.push(isString(value, key))
                    break
                case EDataType.NUMBER:
                    results.push(isInt(value, key))
                    break
                case EDataType.BOOLEAN:
                    results.push(isBool(value, key))
                    break
                case EDataType.OBJECT: // REUQUIRES SCHEMA OPTIONS ARRAY
                    results.push(isObject(value, key))
                    break
                case EDataType.ARRAY:
                    results.push(isArray(value, key))
                default:
                    break
            }

            //minLength
            if (schemaOption.hasOwnProperty('minLength')) {
                results.push(minLength(value, key, schemaOption.minLength))
            }

            //maxLength
            if (schemaOption.hasOwnProperty('maxLength')) {
                results.push(maxLength(value, key, schemaOption.maxLength))
            }

            //maxValue
            if (schemaOption.hasOwnProperty('maxValue')) {
                results.push(maxValue(value, key, schemaOption.maxValue))
            }

            //minValue
            if (schemaOption.hasOwnProperty('minValue')) {
                results.push(minValue(value, key, schemaOption.minValue))
            }

            //inArray
            if (schemaOption.hasOwnProperty('inArray')) {
                results.push(inArray(value, key, schemaOption.inArray))
            }

            //objHasKeys
            if (schemaOption.hasOwnProperty('objHasKeys')) {
                results.push(objHasKeys(schemaOption.objHasKeys, key, value))
            }

            // customValidator function
            if (schemaOption.hasOwnProperty('customValidator')) {
                results.push(schemaOption.customValidator(value, key))
            }

            // if is object, it should have an array of schemaOptions
            if (schemaOption.type === EDataType.OBJECT) {
                if (schemaOption.hasOwnProperty('schemaOptions')) {
                    const subResults = DataValidator(
                        value,
                        schemaOption.schemaOptions
                    )

                    if (subResults !== true) {
                        results.push({ [key]: subResults })
                    }
                }
            }
        }
    })

    const filteredResults = results.filter((e) => e !== true)
    return filteredResults.length == 0 ? true : filteredResults
}
