import React, { FC, useState, useEffect } from "react";
import { Modal } from "antd";

interface ExamPropsInterface {
  visible: boolean;
  onChange: () => void;
}
/**
 * 考试弹窗
 * @param props
 * @returns
 */
const Exam: FC<ExamPropsInterface> = (props) => {
  const { visible, onChange } = props;

  const handleOk = () => {
    onChange();
  };

  const handleCancel = () => {
    onChange();
  };

  return (
    <Modal
      title="试卷上传"
      maskClosable={false}
      visible={visible}
      onCancel={handleCancel}
      onOk={handleOk}
      bodyStyle={{
        padding: "16px 32px",
      }}
    >
      考试
    </Modal>
  );
};

export default Exam;
