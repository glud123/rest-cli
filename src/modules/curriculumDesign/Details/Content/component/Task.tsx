import React, { FC, useState, useEffect } from "react";
import { Modal } from "antd";

interface ExamPropsInterface {
  visible: boolean;
  onChange: () => void;
}
/**
 * 任务资源弹窗
 * @param props
 * @returns
 */
const Task: FC<ExamPropsInterface> = (props) => {
  const { visible, onChange } = props;

  const handleOk = () => {
    onChange();
  };

  const handleCancel = () => {
    onChange();
  };

  return (
    <Modal visible={visible} onCancel={handleCancel} onOk={handleOk}>
      任务资源
    </Modal>
  );
};

export default Task;
