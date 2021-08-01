import React, { FC, useMemo } from "react";
import {
  Form as AntdForm,
  Input,
  InputNumber,
  DatePicker,
  TimePicker,
  Select,
  Cascader,
  Radio,
} from "antd";

import type { FormProps } from "antd/lib/form/index";
import { FormOptions, FormOptionsItem, FormItemTypeEnum } from "./type";

export const useForm = () => {
  return useMemo(() => {
    return AntdForm.useForm();
  }, []);
};

const Form: FC<FormProps & FormOptions> = (props) => {
  const { options, children, ...args } = props;

  return (
    <AntdForm {...args}>
      <FormCreater options={options} />
      {children}
    </AntdForm>
  );
};

const FormCreater: FC<FormOptions & any> = (props) => {
  const { options } = props;
  return options.map((optionItem: FormOptionsItem) => {
    const {
      type,
      label,
      key,
      required,
      edit = true,
      visible = true,
      rules,
      options,
    } = optionItem;
    if (!visible) return null;
    return (
      <AntdForm.Item
        key={key}
        name={key}
        label={label}
        required={required}
        rules={rules}
      >
        {edit ? (
          <FormItemSwitch {...optionItem} />
        ) : (
          <ShowItem type={type} options={options} />
        )}
      </AntdForm.Item>
    );
  });
};

const FormItemSwitch: FC<FormOptionsItem> = (props) => {
  const { type, disabled, placeholder, options, value, onChange } = props;

  const itemOpts = {
    value,
    onChange,
    disabled,
    placeholder,
  };

  switch (type) {
    case FormItemTypeEnum.Select:
      return <Select {...itemOpts} />;
    case FormItemTypeEnum.Radio:
      return (
        <Radio.Group {...itemOpts}>
          {options.map((option: any, index: number) => {
            const { value, label } = option;
            return (
              <Radio key={value} value={value}>
                {label}
              </Radio>
            );
          })}
        </Radio.Group>
      );
    case FormItemTypeEnum.Date:
      return <DatePicker {...itemOpts} />;
    case FormItemTypeEnum.DateTime:
      return <DatePicker showTime {...itemOpts} />;
    case FormItemTypeEnum.Time:
      return <TimePicker {...itemOpts} />;
    case FormItemTypeEnum.Number:
      return <InputNumber {...itemOpts} />;
    case FormItemTypeEnum.Textarea:
      return <Input.TextArea {...itemOpts} />;
    case FormItemTypeEnum.Text:
    default:
      return <Input {...itemOpts} />;
  }
};

interface ShowItemPropsInterface {
  type: FormItemTypeEnum;
  value?: any;
  options?: any;
}

const ShowItem: FC<ShowItemPropsInterface> = (props) => {
  const { type, value, options } = props;
  let nextValue = value;
  if (nextValue === null || nextValue === undefined) {
    nextValue = "";
  }
  if (type === FormItemTypeEnum.Select) {
    let showValue = options.find(
      (item: { value: any }) => item.value === nextValue
    );
    if (showValue) {
      return <div>{showValue.label}</div>;
    }
  }
  return <div>{nextValue}</div>;
};

export default Form;
