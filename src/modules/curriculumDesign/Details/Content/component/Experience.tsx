import React, { FC, useState, useEffect } from "react";
import { Modal } from "antd";
import Form from "@/components/Form";

import { FormItemTypeEnum } from "@/components/Form/type";

interface HomeWorkPropsInterface {
  visible: boolean;
}
/**
 * 心得体会弹窗
 * @param props
 * @returns
 */
const Experience: FC<HomeWorkPropsInterface> = (props) => {
  const { visible: props_visible } = props;

  const [visible, setVisible] = useState(() => props_visible);

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
