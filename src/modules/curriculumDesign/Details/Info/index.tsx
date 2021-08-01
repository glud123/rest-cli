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
          courseName: "111",
          courseDesc: "",
          recommendMajor: "",
          courseTarget: "",
          recommendHour: undefined,
          courseDesigner: "",
        }}
      ></Form>
    </div>
  );
};

export default Info;
