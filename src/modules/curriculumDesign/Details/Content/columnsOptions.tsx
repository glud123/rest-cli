import React from "react";
import { Tag, Space } from "antd";
export const columns = [
  {
    title: "任务名称",
    dataIndex: "taskName",
    key: "taskName",
  },
  {
    title: "任务类型",
    dataIndex: "taskType",
    key: "taskType",
  },
  {
    title: "排序",
    dataIndex: "sort",
    key: "sort",
  },
  {
    title: "操作",
    key: "action",
    render: (text: any, record: any) => (
      <Space size="middle">
        <a>Invite</a>
        <a>Delete</a>
      </Space>
    ),
  },
];
