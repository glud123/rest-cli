import React from "react";
import { Form, Table, Input, Button, Dropdown, Menu } from "antd";
import { DownOutlined } from "@ant-design/icons";
import OperationList from "@/components/OperationList";
import { columns } from "./columnsOptions";

const Content = () => {
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const handleChange = (
    index: number | undefined,
    list: { value: string; [k: string]: any }[]
  ) => {
    console.log(index, list);
  };

  const handleMenuClick = (e: any) => {
    console.log("click", e);
  };

  const data = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
  ];

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1">课件</Menu.Item>
      <Menu.Item key="2">考试</Menu.Item>
      <Menu.Item key="3">作业</Menu.Item>
      <Menu.Item key="1">心得</Menu.Item>
      <Menu.Item key="2">评价</Menu.Item>
      <Menu.Item key="3">其他</Menu.Item>
    </Menu>
  );
  return (
    <div className="curriculum-content">
      <div className="cc-left">
        <OperationList data={[]} onChange={handleChange} />
      </div>
      <div className="cc-right">
        <div className="cc-right-form">
          <Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 14 }}
            name="basic"
            initialValues={{}}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="阶段名称"
              name="courseName"
              required
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="阶段描述" name="courseDesc">
              <Input />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
              <Dropdown overlay={menu}>
                <Button>
                  添加任务 <DownOutlined />
                </Button>
              </Dropdown>
            </Form.Item>
          </Form>
        </div>
        <div className="cc-right-table">
          <Table columns={columns} dataSource={data} />
        </div>
      </div>
    </div>
  );
};

export default Content;
