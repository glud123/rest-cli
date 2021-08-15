import React from "react";
import ListInnerBittonGroup from "@/components/ListInnerBtnGroup";

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
        <ListInnerBittonGroup
          options={[
            {
              key: "edit",
              name: "编辑",
              onClick: btnClick,
            },
            {
              key: "del",
              name: "删除",
              onClick: btnClick,
            },
          ]}
          record={record}
        />
      ),
    },
  ];
};
