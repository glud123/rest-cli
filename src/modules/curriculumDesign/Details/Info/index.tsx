import React, { FC, useEffect } from "react";
import { useHistory } from "react-router-dom";
import useUrlState from "@ahooksjs/use-url-state";
import Form from "@/components/Form";
import ButtonGroup from "@/components/ButtonGroup";
import { useForm } from "@/components/Form";
import { useSetRecoilState } from "recoil";
import Store from "@/store";
import Message from "@/components/Message";
import { post } from "@/util/fetchUtil";
import { getButtonOptions } from "./buttonOptions";
import { getFormOptions } from "./formOptions";

interface InfoPropsInterface {
  onChange: (key: number) => void;
}

const Info: FC<InfoPropsInterface> = (props) => {
  const { onChange } = props;
  let history = useHistory();
  const [form] = useForm();
  const [urlParams, setUrlParams] = useUrlState();
  const formOptions = getFormOptions();
  const setOperation = useSetRecoilState(Store.platform.operationState);
  const buttonOptions = getButtonOptions();

  // 获取基本信息数据
  const getInfoData = () => {
    if (!urlParams.id) {
      return;
    }
    let id = Number(urlParams.id);
    post("design/coursebase/get", { courseId: id }).then((data) => {
      if (data) {
        const {
          id,
          courseName,
          courseDesc,
          recommendMajor,
          courseTarget,
          recommendHour,
        } = data;
        form.setFieldsValue({
          id,
          courseName,
          courseDesc,
          recommendMajor,
          courseTarget,
          recommendHour,
        });
      }
    });
  };

  // 按钮点击事件
  const handleBtnClick = async (key: string) => {
    switch (key) {
      case "next":
        // 基本信息保存
        let values = form.getFieldsValue(true);
        await form.validateFields(["courseName"]);
        // 新增
        let url = "design/coursebase/save";
        if (urlParams.id) {
          // 修改
          url = "design/coursebase/update";
        }
        post(url, values).then((data) => {
          if (data) {
            const { courseId: id } = data;
            if (id) {
              setUrlParams({ ...urlParams, id });
            }
            Message.success("保存成功！");
            onChange(1);
          }
        });
        break;
      default:
        history.push("/curriculum-design/");
        break;
    }
  };

  useEffect(() => {
    setOperation(
      <ButtonGroup options={buttonOptions} onClick={handleBtnClick} />
    );
    getInfoData();
  }, []);

  return (
    <div className="curriculum-info">
      <Form
        form={form}
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
