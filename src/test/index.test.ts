import { EDataType } from '../EDataTypes';
import { DataValidator } from './../index';

// For testing purposes
const PersonSchema = [
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
        key: 'followers',
        required: false,
        type: EDataType.NUMBER,
        minValue: 10,
    },
    {
        key: 'parkingTickets',
        required: false,
        type: EDataType.NUMBER,
        maxValue: 2,
    },
    {
        key: 'password',
        required: false,
        type: EDataType.STRING,
        minLength: 8,
    },
    {
        key: 'zipcode',
        required: false,
        type: EDataType.STRING,
        maxLength: 8,
    },
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
    {
        key: 'hair',
        required: false,
        type: EDataType.OBJECT,
        objHasKeys: ['color', 'length'],
    },
    {
        key: 'occupation',
        required: false,
        type: EDataType.STRING,
        inArray: ['lawyer', 'doctor'],
        customValidator: (value: any, key: 'occupation') =>
            value !== 'police officer'
                ? 'occupation must not be "police officer"'
                : true,
    },
    {
        key: 'secondaryOccupation',
        required: false,
        type: EDataType.STRING,
        customValidator: (value: any, key: 'secondaryOccupation') =>
            value !== 'police officer'
                ? 'occupation must not be "police officer"'
                : true,
    },
];
describe('DataValidator', () => {
    it('Should return "name is required"', () => {
        const invalidPerson = {
            name: '',
            age: 21,
            male: true,
        };
        const result = DataValidator(invalidPerson, PersonSchema);
        expect(result[0]).toEqual('name is required');
    });

    it('Should return "name must be a string"', () => {
        const invalidPerson = {
            name: 123,
            age: 21,
            male: true,
        };
        const result = DataValidator(invalidPerson, PersonSchema);
        expect(result[0]).toEqual('name must be a string');
    });
    it('Should return "age must be a number"', () => {
        const invalidPerson = {
            name: '123',
            age: '21',
            male: true,
        };
        const result = DataValidator(invalidPerson, PersonSchema);
        expect(result[0]).toEqual('age must be a number');
    });
    it('Should return "male must be a boolean"', () => {
        const invalidPerson = {
            name: '123',
            age: 21,
            male: 'yo momma',
        };
        const result = DataValidator(invalidPerson, PersonSchema);
        expect(result[0]).toEqual('male must be a boolean');
    });
    it(`Should return "followers must be 10 or more"`, () => {
        const invalidPerson = {
            name: 'James Bond',
            age: 30,
            male: true,
            followers: 5,
        };
        const result = DataValidator(invalidPerson, PersonSchema);
        expect(result[0]).toEqual('followers must be 10 or more');
    });
    it(`Should return "parkingTickets must be 2 or less"`, () => {
        const invalidPerson = {
            name: 'Donkey Kong',
            age: 22,
            male: false,
            parkingTickets: 5,
        };
        const result = DataValidator(invalidPerson, PersonSchema);
        expect(result[0]).toEqual('parkingTickets must be 2 or less');
    });
    it(`Should return "password must be 8 characters or more"`, () => {
        const invalidPerson = {
            name: 'Hacker Jon',
            age: 22,
            male: true,
            password: '1234',
        };
        const result = DataValidator(invalidPerson, PersonSchema);
        expect(result[0]).toEqual('password must be 8 characters or more');
    });
    it(`Should return "zipcode must be 8 characters or less"`, () => {
        const invalidPerson = {
            name: 'Carmen Sandiego',
            age: 22,
            male: false,
            zipcode: '1A2B3C4D5E',
        };
        const result = DataValidator(invalidPerson, PersonSchema);
        expect(result[0]).toEqual('zipcode must be 8 characters or less');
    });
    it('Should return an errors array of length 6 because 6 invalid options were supplied', () => {
        const invalidPerson = {
            name: 123,
            age: 'yo mom',
            male: 69,
            middleName: true,
            alive: 'hasjdfkhdaskjhlk',
            weight: 'this is a string!',
        };
        const result = DataValidator(invalidPerson, PersonSchema);
        expect(result !== true ? result.length : 0).toEqual(6);
    });
    it('Should return is not an object', () => {
        const invalidPerson = {
            name: 'namer',
            age: 1235,
            male: true,
            settings: 'test',
        };
        const result = DataValidator(invalidPerson, PersonSchema);
        expect(result[0]).toEqual('settings must be an object');
    });
    it('Should return an error array because one object property is missing', () => {
        const invalidPerson = {
            name: 'joe',
            age: 55,
            male: true,
            hair: {
                color: 'brown',
            },
        };
        const result = DataValidator(invalidPerson, PersonSchema);
        expect(result !== true ? result.length : 0).toEqual(1);
    });
    it(`Should return "must be one of the following: lawyer, doctor"`, () => {
        const invalidPerson = {
            name: 'joe',
            age: 55,
            male: true,
            occupation: 'software engineer',
        };
        const result = DataValidator(invalidPerson, PersonSchema);
        expect(result[0]).toEqual(
            'occupation must be one of the following: lawyer, doctor'
        );
    });
    it(`Should return 'occupation must not be "police officer"'`, () => {
        const invalidPerson = {
            name: 'joe',
            age: 55,
            male: true,
            occupation: 'lawyer',
            secondaryOccupation: 'police officer',
        };
        const result = DataValidator(invalidPerson, PersonSchema);
        expect(result[0]).toEqual('occupation must not be "police officer"');
    });
    it(`Should return that 'private is required' || 'notifications is required'`, () => {
        const invalidPerson = {
            name: 'joe',
            age: 55,
            male: true,

            settings: {
                notifications: {},
            },
        };
        const result = DataValidator(invalidPerson, PersonSchema) as any;
        expect(result[0].settings[0]).toEqual('private is required');
        expect(result[0].settings[2].notifications[0]).toEqual(
            'muted is required'
        );
        expect(result[0].settings[2].notifications[1]).toEqual(
            'mobileEnabled is required'
        );
    });
});
