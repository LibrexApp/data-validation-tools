import { EDataType } from "../edata-types";
import { DataValidator } from "./../index";

// For testing purposes
const PersonSchema = [
  {
    key: "name",
    required: true,
    type: EDataType.STRING,
  },
  {
    key: "age",
    required: true,
    type: EDataType.NUMBER,
  },
  {
    key: "male",
    required: true,
    type: EDataType.BOOLEAN,
  },
  {
    key: "middleName",
    required: false,
    type: EDataType.STRING,
  },
  {
    key: "weight",
    required: false,
    type: EDataType.NUMBER,
  },
  {
    key: "alive",
    required: false,
    type: EDataType.BOOLEAN,
  },
];

describe("DataValidator", () => {
  it('Should return "name is required"', () => {
    const invalidPerson = {
      age: 21,
      male: true,
    };
    const result = DataValidator(invalidPerson, PersonSchema);
    expect(result[0]).toEqual("name is required");
  });

  it('Should return "name must be a string"', () => {
    const invalidPerson = {
      name: 123,
      age: 21,
      male: true,
    };
    const result = DataValidator(invalidPerson, PersonSchema);
    expect(result[0]).toEqual("name must be a string");
  });
  it('Should return "age must be a number"', () => {
    const invalidPerson = {
      name: "123",
      age: "21",
      male: true,
    };
    const result = DataValidator(invalidPerson, PersonSchema);
    expect(result[0]).toEqual("age must be a number");
  });
  it('Should return "male must be a boolean"', () => {
    const invalidPerson = {
      name: "123",
      age: 21,
      male: "yo momma",
    };
    const result = DataValidator(invalidPerson, PersonSchema);
    expect(result[0]).toEqual("male must be a boolean");
  });
  it("Should return an errors array of length 6 because 6 invalid options were supplied", () => {
    const invalidPerson = {
      name: 123,
      age: "yo mom",
      male: 69,
      middleName: true,
      alive: "hasjdfkhdaskjhlk",
      weight: "this is a string!",
    };
    const result = DataValidator(invalidPerson, PersonSchema);
    expect(result !== true ? result.length : []).toEqual(6);
  });
});
