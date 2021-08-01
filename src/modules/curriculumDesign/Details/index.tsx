import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { Steps } from "antd";
import Store from "@/store";
import { Blocks, Block } from "@/components/BlockLayout";
import ButtonGroup from "@/components/ButtonGroup";
import Info from "./Info";
import Content from "./Content";
import Deploy from "./Deploy";
import { getButtonOptions } from "./buttonOptions";
import { useForm } from "@/components/Form";
import { post } from "@/util/fetchUtil";
import "./index.less";

const Details = () => {
  let history = useHistory();

  const [current, setCurrent] = useState(0);

  const setOperation = useSetRecoilState(Store.platform.operationState);

  const [info_form] = useForm();

  const [content_form] = useForm();

  const handleBtnClick = async (key: string) => {
    switch (key) {
      case "save":
        if (current === 0) {
          let values = info_form.getFieldsValue(true);
          console.log(values);
          try {
            await info_form.validateFields(["courseName"]);
            post("design/coursebase/save", values);
            console.log("Success:", values);
          } catch (errorInfo) {
            console.log("Failed:", errorInfo);
          }
        }
        if (current === 1) {
          let values = content_form.getFieldsValue(true);
          console.log(values);
          try {
            const values = await content_form.validateFields(["courseName"]);
            console.log("Success:", values);
          } catch (errorInfo) {
            console.log("Failed:", errorInfo);
          }
        }
        break;
      case "pre":
        setCurrent(current - 1);
        break;
      case "next":
        setCurrent(current + 1);
        break;
      case "storage":
        // 暂存
        console.log(key);
        break;
      case "deploy":
        // 发布
        console.log(key);
        break;
      default:
        history.push("/curriculum-design/");
        break;
    }
  };

  const buttonOptions = getButtonOptions(current);
  useEffect(() => {
    setOperation(
      <ButtonGroup options={buttonOptions} onClick={handleBtnClick} />
    );
  }, [current]);

  const onChange = (current: any) => {
    console.log("onChange:", current);
    setCurrent(current);
  };

  return (
    <Blocks row={1}>
      <Block row={1}>
        <div className="curriculum-details">
          <div className="cd-top">
            <Steps
              type="navigation"
              current={current}
              onChange={onChange}
              className="site-navigation-steps"
            >
              <Steps.Step status="finish" title="基本信息" />
              <Steps.Step status="process" title="课程内容" />
              <Steps.Step status="wait" title="发布" />
            </Steps>
          </div>
          <div className="cd-bottom">
            {current === 0 && <Info form={info_form} />}
            {current === 1 && <Content form={content_form} />}
            {current === 2 && <Deploy />}
          </div>
        </div>
      </Block>
    </Blocks>
  );
};

export default Details;
