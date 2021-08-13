import React from "react";
import { Tag, Space } from "antd";
export const getColumns = (btnClick: (type: string, record: any) => void) => {
  return [
    {
      title: "课程名称",
      dataIndex: "courseName",
      key: "courseName",
    },
    {
      title: "课程状态",
      key: "courseStatus",
      dataIndex: "courseStatus",
    },
    {
      title: "创建人",
      key: "createUser",
      dataIndex: "createUser",
    },
    {
      title: "创建时间",
      key: "createTime",
      dataIndex: "createTime",
    },
    {
      title: "Action",
      key: "action",
      render: (text: any, record: any) => (
        <Space size="middle">
          <span
            onClick={() => {
              btnClick("edit", record);
            }}
          >
            编辑
          </span>
          <span
            onClick={() => {
              btnClick("del", record);
            }}
          >
            删除
          </span>
        </Space>
      ),
    },
  ];
};
