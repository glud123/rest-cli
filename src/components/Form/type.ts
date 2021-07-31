import type { Rule } from "rc-field-form/lib/interface";
export type FormOptions = {
  options: FormOptionsItem[];
  // onChange?: (key: string, value: any, values: any) => void;
};

export type FormOptionsItem = {
  label: string;
  key: string;
  type: FormItemTypeEnum;
  value: any;
  required?: boolean;
  edit?: boolean;
  disabled?: boolean;
  visible?: boolean;
  placeholder?: string;
  rules?: Rule[];
  options?: any;
};

export enum FormItemTypeEnum {
  Text = "text",
  Textarea = "textarea",
  Select = "select",
  Checkbox = "checkbox",
  Radio = "radio",
  Date = "date",
  Time = "time",
  DateTime = "datetime",
  File = "file",
  Image = "image",
  Number = "number",
  Password = "password",
  Email = "email",
  Url = "url",
}
