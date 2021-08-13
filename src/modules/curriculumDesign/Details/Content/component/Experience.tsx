import React, { FC, useState, useEffect } from "react";
import { Modal } from "antd";
import Form from "@/components/Form";

import { FormItemTypeEnum } from "@/components/Form/type";

interface ExperiencePropsInterface {
  visible: boolean;
  onChange: () => void;
}
/**
 * 心得体会弹窗
 * @param props
 * @returns
 */
const Experience: FC<ExperiencePropsInterface> = (props) => {
  const { visible, onChange } = props;

  const formOptions = getFormOptions();

  const handleOk = () => {
    onChange();
  };

  const handleCancel = () => {
    onChange();
  };

  return (
    <Modal title="心得体会" maskClosable={false} visible={visible} onCancel={handleCancel} onOk={handleOk}>
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
        options={formOptions}
      />
    </Modal>
  );
};

const getFormOptions = () => {
  return [
    {
      type: FormItemTypeEnum.Text,
      label: "心得名称",
      key: "experienceName",
      required: true,
      rules: [{ required: true, message: "Please input your username!" }],
    },
    {
      type: FormItemTypeEnum.Textarea,
      label: "要求",
      key: "requirement",
    },
    {
      type: FormItemTypeEnum.Textarea,
      label: "提示",
      key: "bootPrompt",
    },
    {
      type: FormItemTypeEnum.Text,
      label: "评分方式",
      key: "scoringMethod",
    },
  ];
};

export default Experience;
