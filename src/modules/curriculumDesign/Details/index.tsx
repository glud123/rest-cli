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
import "./index.less";

const Details = () => {
  let history = useHistory();

  const [current, setCurrent] = useState(0);

  const setOperation = useSetRecoilState(Store.platform.operationState);

  const handleBtnClick = (key: string) => {
    switch (key) {
      case "save":
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
            {current === 0 && <Info />}
            {current === 1 && <Content />}
            {current === 2 && <Deploy />}
          </div>
        </div>
      </Block>
    </Blocks>
  );
};

export default Details;
