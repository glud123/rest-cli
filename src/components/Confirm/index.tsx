import React from "react";
import { Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const open = (message: string) => {
  return new Promise((resolve, reject) => {
    const modal = Modal.confirm({
      title: "警告",
      icon: <ExclamationCircleOutlined />,
      content: `${message}？`,
      onOk: () => {
        modal.destroy();
        resolve(true);
      },
      onCancel: () => {
        modal.destroy();
        reject();
      },
      okText: "确认",
      cancelText: "取消",
    });
  });
};

export default { open };
