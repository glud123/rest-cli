import React, { FC, useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import useUrlState from "@ahooksjs/use-url-state";
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
  const [urlParams, setUrlParams] = useUrlState();

  const [deployData, setDeployData] = useState<
    { name: string; count: number }[]
  >([]);

  const setOperation = useSetRecoilState(Store.platform.operationState);

  const buttonOptions = getButtonOptions();

  // 按钮点击事件
  const handleBtnClick = async (key: string) => {
    if (!urlParams.id) {
      return;
    }
    let id = parseInt(urlParams.id);
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
        post("design/coursebase/release", { courseId: id }).then((data) => {
          if (data) {
            Message.success(data.msg);
          }
        });
        break;
      default:
        history.push("/curriculum-design/");
        break;
    }
  };

  const getData = () => {
    if (!urlParams.id) {
      return;
    }
    let id = parseInt(urlParams.id);
    post("design/coursebase/view", { courseId: id }).then((data) => {
      if (data) {
        let listData = handleData(data);
        setDeployData(listData);
      }
    });
  };

  useEffect(() => {
    setOperation(
      <ButtonGroup options={buttonOptions} onClick={handleBtnClick} />
    );
    getData();
  }, []);

  return (
    <div className="curriculum-deploy">
      <div className="cd-title">项目概要</div>
      <ul className="cd-container">
        {deployData.map((item, index) => {
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

interface handleDataInterface {
  (data: { [k: string]: number }): { count: number; name: string }[];
}

const handleData: handleDataInterface = (data) => {
  return Object.keys(data).map((k) => {
    const count = data[k];
    let name = "";
    if ((k = "taskCount")) {
      name = "任务";
    }
    if ((k = "coursewareCount")) {
      name = "课件";
    }
    if ((k = "testCount")) {
      name = "考试";
    }
    if ((k = "homeworkCount")) {
      name = "作业";
    }
    if ((k = "experienceCount")) {
      name = "心得";
    }
    return {
      count,
      name,
    };
  });
};

export default Deploy;
