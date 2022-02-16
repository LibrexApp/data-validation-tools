import { EDataType } from "./edata-types";

export interface ISchemaOption {
  key: string;
  required: boolean;
  type: EDataType;
  additionalProperties?: any;
  minValue?: number;
  maxValue?: number;
  minLength?: number;
  maxLength?: number;
}
