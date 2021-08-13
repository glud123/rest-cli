import React, { FC, useState, useEffect } from "react";
import { Modal } from "antd";
import Form from "@/components/Form";

import { FormItemTypeEnum } from "@/components/Form/type";

interface HomeWorkPropsInterface {
  visible: boolean;
  onChange: () => void;
}
/**
 * 作业弹框
 * @param props
 * @returns
 */
const HomeWork: FC<HomeWorkPropsInterface> = (props) => {
  const { visible, onChange } = props;

  const formOptions = getFormOptions();

  const handleOk = () => {
    onChange();
  };

  const handleCancel = () => {
    onChange();
  };

  return (
    <Modal
      title="作业"
      maskClosable={false}
      visible={visible}
      onCancel={handleCancel}
      onOk={handleOk}
    >
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
      label: "作业名称",
      key: "homeworkName",
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

export default HomeWork;
