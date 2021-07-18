import React from "react";
// import Form from "@/components/Form";
import { Form, Input, InputNumber, Button } from "antd";

const Info = () => {
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="curriculum-info">
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
        name="basic"
        initialValues={{}}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="课程名称"
          name="courseName"
          required
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="课程简述" name="courseDesc">
          <Input />
        </Form.Item>
        <Form.Item label="课程目标" name="recommendMajor">
          <Input />
        </Form.Item>
        <Form.Item label="课程对象" name="courseTarget">
          <Input />
        </Form.Item>
        <Form.Item label="课程时长" name="recommendHour">
          <InputNumber />
        </Form.Item>
        <Form.Item label="课程设计者" name="courseDesigner">
          <Input />
        </Form.Item>
      </Form>
    </div>
  );
};

export default Info;
