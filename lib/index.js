"use strict";
exports.__esModule = true;
exports.InterfaceValidator = exports.createKeys = void 0;
function createKeys(keyRecord) {
    return Object.keys(keyRecord);
}
exports.createKeys = createKeys;
function pluck(o, propertyNames) {
    return propertyNames.map(function (n) { return o[n]; });
}
// type WithProperty<K extends string, V = {}> = {
//   [P in K]: V;
// };
// function withProperty<T, K extends string, V>(x: T, properties: WithProperty<K, V>) {
//   return Object.assign(x, properties);
// }
function InterfaceValidator(type) {
    // function
    // ValidateInterface<IInterface>(type: IInterface): true | string[]
    // type = instance of interface we are trying to check
    //
    //   interface example {
    //     name: string;
    //     age?: number;
    //   }
    //===== EX =====//
    // This should return true
    //   validInterface = {
    //       name: "Andrew",
    //       age: 25
    //   }
    //This should return ["name is required and must be a string"]
    //   invalidInterface = {
    //     age: 25,`
    //   };
    //   return errors.length > 0 ? errors : true;
    return true;
}
exports.InterfaceValidator = InterfaceValidator;
var person = {
    age: 18,
    weight: 185
};
// const keysOfProps = keys<Props>();
// console.log(keysOfProps); // ['id', 'name', 'age']
// const isValid = InterfaceValidator<IPerson>(person);
// console.log(isValid);
