import React from "react";
import { Button } from "antd";

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

const Deploy = () => {
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
