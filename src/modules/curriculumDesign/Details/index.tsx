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
  const [current, setCurrent] = useState(() => {
    let c = urlParams.current;
    return c ? parseInt(c) : 0;
  });

  useEffect(() => {
    setUrlParams({ current });
  }, [current]);

  const onChange = (c: number) => {
    setCurrent(c);
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
              <Steps.Step status={handleStatus(current, 0)} title="基本信息" />
              <Steps.Step status={handleStatus(current, 1)} title="课程内容" />
              <Steps.Step status={handleStatus(current, 2)} title="发布" />
            </Steps>
          </div>
          <div className="cd-bottom">
            {current === 0 && <Info onChange={onChange} />}
            {current === 1 && <Content onChange={onChange} />}
            {current === 2 && <Deploy onChange={onChange} />}
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
