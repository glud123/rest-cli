import React from "react";
import { Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const open = (message: string) => {
  Modal.confirm({
    title: "确认",
    icon: <ExclamationCircleOutlined />,
    content: `${message}？`,
    okText: "确认",
    cancelText: "取消",
  });
};

export default { open };
