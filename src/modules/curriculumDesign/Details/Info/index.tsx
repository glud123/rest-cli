import React, { FC } from "react";
import Form from "@/components/Form";
import { getFormOptions } from "./formOptions";

const Info: FC<{ form: any }> = (props) => {
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const formOptions = getFormOptions();

  return (
    <div className="curriculum-info">
      <Form
        form={props.form}
        options={formOptions}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
        name="info"
        initialValues={{
          courseName: "111",
          courseDesc: "",
          recommendMajor: "",
          courseTarget: "",
          recommendHour: undefined,
          courseDesigner: "",
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      ></Form>
    </div>
  );
};

export default Info;
