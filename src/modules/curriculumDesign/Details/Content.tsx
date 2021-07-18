import React from "react";
import { Form, Input, InputNumber, Button } from "antd";
import OperationList from "@/components/OperationList";

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
  return (
    <div className="curriculum-content">
      <div className="cc-left">
        <OperationList data={[]} onChange={handleChange} />
      </div>
      <div className="cc-right">
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
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="阶段描述" name="courseDesc">
            <Input />
          </Form.Item>
          <Form.Item label="阶段描述" name="courseDesc">
            <Button>上一步</Button>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 18, span: 16 }}>
            <Button>上一步</Button>
            <Button type="primary">下一步</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Content;
