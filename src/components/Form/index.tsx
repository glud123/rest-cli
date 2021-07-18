import React, { FC } from "react";
import { Form as AntdForm, Input, InputNumber } from "antd";
import type { FormInstance } from "antd/lib/form/index";
import { FormOptions, FormOptionsItem, FormItemTypeEnum } from "./type";

const Form: FC<FormInstance & FormOptions> = (props) => {
  const { options, ...args } = props;
  return (
    <AntdForm {...args}>
      <FormCreater options={options} />
    </AntdForm>
  );
};

const FormCreater: FC<FormOptions & any> = (props) => {
  const { options } = props;
  return options.map((optionItem: FormOptionsItem) => {
    return <FormItemSwitch {...optionItem} />;
  });
};

const FormItemSwitch: FC<FormOptionsItem> = (props) => {
  const { type, label, key, required } = props;
  switch (type) {
    case FormItemTypeEnum.Select:
      return (
        <AntdForm.Item>
          <Input type="textarea" />
        </AntdForm.Item>
      );
    case FormItemTypeEnum.Radio:
      return (
        <AntdForm.Item>
          <Input type="textarea" />
        </AntdForm.Item>
      );
    case FormItemTypeEnum.Date:
      return (
        <AntdForm.Item>
          <Input type="textarea" />
        </AntdForm.Item>
      );
    case FormItemTypeEnum.DateTime:
      return (
        <AntdForm.Item>
          <Input type="textarea" />
        </AntdForm.Item>
      );
    case FormItemTypeEnum.Time:
      return (
        <AntdForm.Item>
          <Input type="textarea" />
        </AntdForm.Item>
      );
    case FormItemTypeEnum.Number:
      return (
        <AntdForm.Item>
          <InputNumber />
        </AntdForm.Item>
      );
    case FormItemTypeEnum.Textarea:
      return (
        <AntdForm.Item>
          <Input type="textarea" />
        </AntdForm.Item>
      );
    case FormItemTypeEnum.Text:
    default:
      return (
        <AntdForm.Item>
          <Input />
        </AntdForm.Item>
      );
  }
};

export default Form;
