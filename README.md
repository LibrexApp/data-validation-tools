# data-validation-tools

[![Publish](https://github.com/LibrexApp/data-validation-tools/actions/workflows/publish.yml/badge.svg)](https://github.com/LibrexApp/data-validation-tools/actions/workflows/publish.yml)

Some handy dandy helpers for data validation

# How to use

View package on [NPM](https://www.npmjs.com/package/data-validation-tools)

## Install package

```ts
yarn add data-validation-tools
```

## Import

```ts
import { DataValidator } from 'data-validation-tools';
```

## [REQUIRED] Define a Schema

```ts
const PersonSchema: ISchemaOption = [
    {
        key: 'name',
        required: true,
        type: EDataType.STRING,
    },
    {
        key: 'age',
        required: true,
        type: EDataType.NUMBER,
    },
    {
        key: 'male',
        required: true,
        type: EDataType.BOOLEAN,
    },
    {
        key: 'middleName',
        required: false,
        type: EDataType.STRING,
    },
    {
        key: 'weight',
        required: false,
        type: EDataType.NUMBER,
    },
    {
        key: 'alive',
        required: false,
        type: EDataType.BOOLEAN,
    },
    {
        key: 'occupation',
        required: false,
        type: EDataType.STRING,
        inArray: ['doctor', 'lawyer'],
    },
    {
        key: 'hair',
        required: false,
        type: EDataType.OBJECT,
        objHasKeys: ['color', 'length'],
    },
];
```

## [OPTIONAL] Define an accompanying interface for intellisense

```ts
interface IPerson {
    name: string;
    age: number;
    male: boolean;
    middleName?: string; // not required
    weight?: number; // not required
    alive?: boolean; // not required
}
```

## Validate some data

Imagine you receive some data, perhaps some params from a form, or some data
being sent to your api...

```ts
const dataFromAPIRequest = {
    // missing name, we should receive a validation error
    age: 21,
    male: true,
};

// Returns true if 'dataFromAPIRequest' is a valid instance of PersonSchema
const result = DataValidator(dataFromAPIRequest, PersonSchema);

console.log(result); // in this case, this will return ['name is required']
```

## Validation options

We currently support the following validation options:

```ts
required: boolean, // true/false
type: EDataType.STRING, // enum of STRING, NUMBER, BOOLEAN, OBJECT, ANY
minValue: number, // (optional) number is >= the value passed
maxValue: number, // (optional) number is <= the value passed
minLength: number, // (optional) length of a string is >= the value passed
maxLength: number, // (optional) length of a string is <= the value passed
inArray: string[], // (optional) value passed must match one of the array indexes passed
objHasKey: string[], // (optional) object passed must contain all of array of keys passed
```

## Custom Validators In Validation Schema

Schema with a custom validator

```ts
    {
        key: 'secondaryOccupation',
        required: false,
        type: EDataType.STRING,
        customValidator: (value: any, key: 'secondaryOccupation') =>
            value !== 'police officer'
                ? 'occupation must not be "police officer"'
                : true,
    },
```

Examples

```ts
const isValidPersonCheck1 = DataValidator(
    { ...otherProperties, sececondaryOccupation: 'police officer' },
    PersonSchema
);
// this would resolve to 'occupation must not be "police officer"' since our value fails the customValidation check

const isValidPersonCheck1 = DataValidator(
    { ...otherProperties, sececondaryOccupation: 'teacher' },
    PersonSchema
);
// this evaluates to true since our value passes the customValidation check
```
