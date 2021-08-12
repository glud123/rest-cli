import React, { FC } from "react";
import Form from "@/components/Form";
import { getFormOptions } from "./formOptions";

const Info: FC<{ form: any }> = (props) => {
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
          courseName: "",
          courseDesc: "",
          recommendMajor: "",
          courseTarget: "",
          recommendHour: "",
        }}
      ></Form>
    </div>
  );
};

export default Info;
