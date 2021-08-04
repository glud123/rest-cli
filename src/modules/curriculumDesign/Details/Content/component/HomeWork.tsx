import React, { FC, useState, useEffect } from "react";
import { Modal } from "antd";
import Form from "@/components/Form";

import { FormItemTypeEnum } from "@/components/Form/type";

interface HomeWorkPropsInterface {
  visible: boolean;
}
/**
 * 作业弹框
 * @param props
 * @returns
 */
const HomeWork: FC<HomeWorkPropsInterface> = (props) => {
  const { visible: props_visible } = props;

  // console.log(props_visible);

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(props_visible);
  }, [props_visible]);

  const formOptions = getFormOptions();

  const handleOk = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <Modal visible={visible} onCancel={handleCancel} onOk={handleOk}>
      <Form options={formOptions} />
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
