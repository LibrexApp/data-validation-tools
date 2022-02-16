# data-validation-tools

[![Publish](https://github.com/LibrexApp/data-validation-tools/actions/workflows/publish.yml/badge.svg)](https://github.com/LibrexApp/data-validation-tools/actions/workflows/publish.yml)

Some handy dandy helpers for data validation

# How to use

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
