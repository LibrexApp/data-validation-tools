# data-validation-tools

![GitHub Workflow Status](https://img.shields.io/github/workflow/status/LibrexApp/data-validation-tools/Publish)
[![npm](https://img.shields.io/npm/v/data-validation-tools)](https://www.npmjs.com/package/data-validation-tools)
![NPM](https://img.shields.io/npm/l/data-validation-tools?color=yellow)
![GitHub contributors](https://img.shields.io/github/contributors/librexapp/data-validation-tools)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/LibrexApp/data-validation-tools)
![npm](https://img.shields.io/npm/dm/data-validation-tools?color=blueviolet)

Some handy dandy helpers for data validation

## Table of Contents

-   [Installation](#installation)
-   [Schema Definition](#schema-definition)
-   [Full Validation Config](#full-validation-config)
-   [Validation Example](#validation-example)
-   [Nested Validators](#nested-validators)
-   [License](#license)

## Installation

Using npm:

```bash
$ npm install data-validation-tools
```

Using yarn:

```bash
$ yarn add data-validation-tools
```

Using jsDelivr CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/data-validation-tools@0.0.15/lib/index.min.js"></script>
```

## Schema Definition

In this package, a schema is an array of schema option objects that define key-value pairs and validation rules against them.

For each variable (key) you want to validate, add a schema option object to the Schema array like the example below:

```ts
import { EDataType, ISchemaOption } from 'data-validation-tools'

/* 
minimum schema option format:
{
    key: string, // the name of the variable to validate
    required: boolean, // whether the variable is required for your use
    type: EDataType.ENUM // to check if the value received is of the correct and expected type
}
*/

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
]

// OPTIONAL - define an accompanying interface for intellisense
interface IPerson {
    name: string
    age: number
    male: boolean
    middleName?: string // not required
    weight?: number // not required
    alive?: boolean // not required
    occupation?: string // not required
    hair?: object // not required
}
```

## Full Validation Config

We currently support the following validation options:

```ts
{
    // REQUIRED
    // `key` is the name of the variable to validate
    key: 'variable_a',

    // REQUIRED
    // `required` is whether this variable must contain a value
    // NOTE: if required = false but a value is received,
    //     the validator will still run on this variable to make sure everything is correct
    // accepted values: true, false
    required: true,

    // REQUIRED
    // `type` is the datatype of this variable being passed to the validator
    // accepted values: STRING, NUMBER, BOOLEAN, OBJECT, ARRAY, or ANY
    type: EDataType.STRING,

    // OPTIONAL
    // `minValue` is the minimum value this variable could be, e.g. variable >= minValue
    // accepted values: number
    minValue: 0,

    // OPTIONAL
    // `maxValue` is the maximum value this variable could be, e.g. maxValue >= variable
    // accepted values: number
    maxValue: 100,

    // OPTIONAL
    // `minLength` is the shortest number of characters a strings should have, e.g. string.length >= minLength
    // accepted values: number
    minLength: 6,

    // OPTIONAL
    // `minLength` is the shortest number of characters a strings should have, e.g. string.length <= maxLength
    // accepted values: number
    maxLength: 16,

    // OPTIONAL
    // `inArray` is a user-defined array of strings that the value needs to match at least one of
    // accepted values: string[]
    inArray: ['red', 'green', 'yellow', 'blue'],

    // OPTIONAL
    // `objHasKey` is a user-defined array of strings which defines all keys that an object must have to pass validation,
    // e.g. if an object 'hair' must contain the following keys: 'hair_color', and 'hair_length', put those keys inside the array
    // accepted values: string[]
    objHasKey: ['hair_color', 'hair_length'],

    // OPTIONAL
    // `customValidator` is a user-defined function to perform specific validation not defined by the options above
    // accepted values: function()
    customValidator: (value: any, key: 'secondaryOccupation') =>
        value !== 'police officer'
            ? true
            : 'secondary occupation must not be "police officer"',
}
```

## Validation Example

This is a simple example of how to use the full DataValidator object with a custom schema

```ts
import { EDataType, ISchemaOption, DataValidator } from 'data-validation-tools'

// user-defined, custom schema - in this case we'll define a user/person object
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
]

// This object is pre-defined for this example, but imagine you receive some data, perhaps some params from a form, or some data being sent to your api...
const dataFromAPIRequest = {
    age: 21,
    male: true,
}

// Run the DataValidator by passing your data to validate and a valid schema object
// The DataValidator will run each key from your data against the supplied schema
//     to see if the data passed is a valid instance of the schema
// Returns: true | string[]
const result = DataValidator(dataFromAPIRequest, PersonSchema)

// If the data passed is valid, `result` will be 'true'
// Otherwise, result will be an array of strings where each index is an error encountered by the Validator
console.log(result)

// in this case, `result` will equal
// ['name is required']
// because the PersonSchema is defined as having a `name` variable which is required,
// but `name` was not passed in the 'dataFromApiRequest'

if (result === true) {
    // run code if data is valid
} else {
    // run code if data is not valid
}
```

## Nested Validators

We also allow the ability to nest a schemaOptions array inside of schema options for those special use-cases. Simply set the `schemaOptions` property of a schemaOption to a nested array of schema options. Data validation tools will handle the rest!

```ts
import { EDataType, ISchemaOption, DataValidator } from 'data-validation-tools'

// user-defined schema declaration
const SettingsSchema: ISchemaOption = [
    {
        key: 'settings',
        required: false,
        type: EDataType.OBJECT,
        schemaOptions: [
            {
                key: 'private',
                required: true,
                type: EDataType.BOOLEAN,
            },
            {
                key: 'notifications',
                required: true,
                type: EDataType.OBJECT,
                schemaOptions: [
                    { key: 'muted', required: true, type: EDataType.BOOLEAN },
                    {
                        key: 'mobileEnabled',
                        required: true,
                        type: EDataType.BOOLEAN,
                    },
                ],
            },
        ],
    },
]

// an invalid payload
const invalidInstance = {
    settings: {
        notifications: {},
    },
}

// run the DataValidator by supplying the data and a valid schema
const result = DataValidator(invalidInstance, SettingsSchema)

// Validation this some data against this schema would return the following...
console.log(result)

/*
[
    {
        settings: [ 
            'private is required', 
            'notifications is required', 
            [Object] // this will refer to any errors inside the nested `notifications` key
        ]
    }
]
*/
```

## License

[MIT](LICENSE)
