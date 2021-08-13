import React, { useEffect, useState } from "react";
import useUrlState from "@ahooksjs/use-url-state";
import { Steps } from "antd";
import { Blocks, Block } from "@/components/BlockLayout";
import Info from "./Info";
import Content from "./Content";
import Deploy from "./Deploy";

import "./index.less";

const Details = () => {
  const [urlParams, setUrlParams] = useUrlState();
  const [step, setStep] = useState(() => {
    let c = urlParams.step;
    return c ? parseInt(c) : 0;
  });

  useEffect(() => {
    setUrlParams({ urlParams, step });
  }, [step]);

  const onChange = (c: number) => {
    setStep(c);
  };

  return (
    <Blocks row={1}>
      <Block row={1}>
        <div className="curriculum-details">
          <div className="cd-top">
            <Steps
              type="navigation"
              current={step}
              className="site-navigation-steps"
            >
              <Steps.Step status={handleStatus(step, 0)} title="基本信息" />
              <Steps.Step status={handleStatus(step, 1)} title="课程内容" />
              <Steps.Step status={handleStatus(step, 2)} title="发布" />
            </Steps>
          </div>
          <div className="cd-bottom">
            {step === 0 && <Info onChange={onChange} />}
            {step === 1 && <Content onChange={onChange} />}
            {step === 2 && <Deploy onChange={onChange} />}
          </div>
        </div>
      </Block>
    </Blocks>
  );
};

/**
 * 步骤状态处理函数
 * @param current 正在操作步骤序号
 * @param status  当前步骤序号
 * @returns
 */
const handleStatus = (current: number, status: number) => {
  if (current > status) {
    return "finish";
  }
  if (current === status) {
    return "process";
  }
  if (current < status) {
    return "wait";
  }
};

export default Details;
