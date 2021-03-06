import { EDataType } from './EDataTypes';
export interface ISchemaOption {
    key: string;
    required: boolean;
    type: EDataType;
    customValidator?: any;
    schemaOptions?: ISchemaOption[];
    additionalProperties?: any;
    minValue?: number;
    maxValue?: number;
    minLength?: number;
    maxLength?: number;
    objHasKeys?: any;
    inArray?: any;
}
