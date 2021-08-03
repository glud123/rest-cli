import React from "react";
import { Tag, Space } from "antd";
export const columns = [
  {
    title: "课程编码",
    dataIndex: "courseCode",
    key: "courseCode",
    render: (
      text:
        | boolean
        | React.ReactPortal
        | React.ReactChild
        | React.ReactFragment
        | null
        | undefined
    ) => <a>{text}</a>,
  },
  {
    title: "课程名称",
    dataIndex: "courseName",
    key: "courseName",
  },
  {
    title: "推荐时长",
    dataIndex: "recommendHour",
    key: "recommendHour",
  },
  {
    title: "推荐专业",
    key: "recommendMajor",
    dataIndex: "recommendMajor",
  },
  {
    title: "课程描述",
    key: "courseDesc",
    dataIndex: "courseDesc",
  },
  {
    title: "课程目标",
    key: "courseTarget",
    dataIndex: "courseTarget",
  },
  {
    title: "推荐等级",
    key: "recommendLevel",
    dataIndex: "recommendLevel",
  },
  {
    title: "课程状态",
    key: "courseStatus",
    dataIndex: "courseStatus",
  },
  {
    title: "课程标志",
    key: "courseLogo",
    dataIndex: "courseLogo",
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
    render: (
      text: any,
      record: {
        name:
          | string
          | number
          | boolean
          | {}
          | React.ReactElement<any, string | React.JSXElementConstructor<any>>
          | React.ReactNodeArray
          | React.ReactPortal
          | null
          | undefined;
      }
    ) => (
      <Space size="middle">
        <a>编辑</a>
        <a>删除</a>
      </Space>
    ),
  },
];
