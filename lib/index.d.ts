export interface IPerson {
    name: string;
    age: number;
    weight?: number;
}
export declare function createKeys<T>(keyRecord: Record<keyof T, any>): (keyof T)[];
export declare function InterfaceValidator<T>(type: any): true | string[];
