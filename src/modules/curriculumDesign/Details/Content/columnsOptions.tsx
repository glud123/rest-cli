import React from "react";
import { Tag, Space } from "antd";
export const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
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
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Tags",
    key: "tags",
    dataIndex: "tags",
    render: (tags: any[]) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? "geekblue" : "green";
          if (tag === "loser") {
            color = "volcano";
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
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
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];
