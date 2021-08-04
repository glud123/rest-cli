import React, { FC, useState, useEffect } from "react";
import { Modal } from "antd";

interface ExamPropsInterface {
  visible: boolean;
}
/**
 * 任务资源弹窗
 * @param props
 * @returns
 */
const Task: FC<ExamPropsInterface> = (props) => {
  const { visible: props_visible } = props;

  const [visible, setVisible] = useState(() => props_visible);

  useEffect(() => {
    setVisible(props_visible);
  }, [props_visible]);

  const handleOk = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <Modal visible={visible} onCancel={handleCancel} onOk={handleOk}>
      任务资源
    </Modal>
  );
};

export default Task;
