import React, { FC, useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { useHistory } from "react-router-dom";
import Store from "@/store";
import { post } from "@/util/fetchUtil";
import Message from "@/components/Message";
import ButtonGroup from "@/components/ButtonGroup";
import { getButtonOptions } from "./buttonOptions";

const listData = [
  {
    count: 2,
    name: "总任务数据",
  },
  {
    count: 2,
    name: "线上课",
  },
  {
    count: 2,
    name: "线下课",
  },
  {
    count: 2,
    name: "考试",
  },
  {
    count: 2,
    name: "作业",
  },
  {
    count: 2,
    name: "实操",
  },
  {
    count: 2,
    name: "心得",
  },
  {
    count: 2,
    name: "调查",
  },
  {
    count: 2,
    name: "评价",
  },
  {
    count: 2,
    name: "线下成绩",
  },
];

interface DeployPropsInterface {
  onChange: (key: number) => void;
}

const Deploy: FC<DeployPropsInterface> = (props) => {
  const { onChange } = props;
  let history = useHistory();

  const setOperation = useSetRecoilState(Store.platform.operationState);

  const buttonOptions = getButtonOptions();

  // 按钮点击事件
  const handleBtnClick = async (key: string) => {
    switch (key) {
      case "save":
        break;
      case "pre":
        // 课程内容
        onChange(1);
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

  useEffect(() => {
    setOperation(
      <ButtonGroup options={buttonOptions} onClick={handleBtnClick} />
    );
  }, []);

  return (
    <div className="curriculum-deploy">
      <div className="cd-title">项目概要</div>
      <ul className="cd-container">
        {listData.map((item, index) => {
          const { count, name } = item;
          return (
            <li>
              <span>{count}</span>
              <span>{name}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Deploy;
