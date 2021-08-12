import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import useUrlState from "@ahooksjs/use-url-state";
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
import Message from "@/components/Message";
import "./index.less";

const Details = () => {
  let history = useHistory();
  const [urlParams, setUrlParams] = useUrlState();
  const [current, setCurrent] = useState(() => {
    let c = urlParams.current;
    return c ? parseInt(c) : 0;
  });
  const [courseId, setCourseId] = useState<number | null>(() => {
    let id = urlParams.courseId;
    return id ? parseInt(id) : null;
  });

  const setOperation = useSetRecoilState(Store.platform.operationState);

  const [info_form] = useForm();

  const [content_form] = useForm();

  // 获取基本信息数据
  const getInfoData = (callback?: () => void) => {
    post("design/coursebase/get", { courseId }).then((data) => {
      if (data) {
        const {
          id,
          courseName,
          courseDesc,
          recommendMajor,
          courseTarget,
          recommendHour,
        } = data;
        info_form.setFieldsValue({
          id,
          courseName,
          courseDesc,
          recommendMajor,
          courseTarget,
          recommendHour,
        });
        callback && callback();
      }
    });
  };

  useEffect(() => {
    if (courseId) {
      getInfoData();
    }
  }, []);

  useEffect(() => {
    setUrlParams({ current, courseId });
  }, [current, courseId]);

  const handleBtnClick = async (key: string) => {
    switch (key) {
      case "save":
        break;
      case "pre":
        let pre = current - 1;
        // 课程内容
        if (current === 1) {
          getInfoData(() => {
            setCurrent(pre);
          });
        }
        break;
      case "next":
        // 基本信息保存
        let next = current + 1;
        if (current === 0) {
          let values = info_form.getFieldsValue(true);
          await info_form.validateFields(["courseName"]);
          // 新增
          let url = "design/coursebase/save";
          if (urlParams.courseId) {
            // 修改
            url = "design/coursebase/update";
          }
          post(url, values).then((data) => {
            if (data) {
              const { courseId: id } = data;
              if (id) {
                setCourseId(id);
              }
              Message.success("保存成功！");
              setCurrent(next);
            }
          });
        }
        // 课程内容保存
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

  const onChange = (c: any) => {
    if (c === 0 || (current === 2 && c === 1)) {
      handleBtnClick("pre");
    }
    if ((current === 0 && c === 1) || c === 2) {
      handleBtnClick("next");
    }
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
