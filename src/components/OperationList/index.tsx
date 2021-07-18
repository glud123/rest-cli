import React, { FC, useState, useEffect } from "react";
import {
  PlusOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  MinusOutlined,
} from "@ant-design/icons";
import "./index.less";

interface OperationListInterface {
  data: { value: string; [k: string]: any }[];
  activeKey?: string;
  onChange?: (
    type: "add" | "del" | "up" | "down",
    list: { value: string; [k: string]: any }[]
  ) => void;
  onAdd?: () => void;
  onDelete?: () => void;
  onUp?: () => void;
  onDown?: () => void;
}

const OperationList: FC<OperationListInterface> = (props) => {
  const { data, activeKey, onChange } = props;

  const [list, setList] = useState<
    {
      _label: string;
      value: string;
      [k: string]: any;
    }[]
  >([]);
  const [num, setNum] = useState(0);

  useEffect(() => {
    if (data && data.length > 0) {
      let nextList = data.map((item, index) => {
        const { value, ...args } = item;
        return {
          _label: `阶段 ${index + 1} `,
          value: value,
          ...args,
        };
      });
      setList(nextList);
    }
  }, [data]);

  const handleBtnClick = (k: "add" | "del" | "up" | "down") => {
    if (k === "add") {
      setList([
        ...list,
        {
          _label: `阶段 ${list.length + 1} `,
          value: `阶段 ${list.length + 1} `,
        },
      ]);
      setNum(list.length);
    }
    if (k === "del") {
    }
    if (k === "up") {
    }
    if (k === "down") {
    }
    let newList = list.map((item) => {
      const { _label, value, ...args } = item;
      return { value, ...args };
    });
    onChange && onChange(k, newList);
  };

  return (
    <div className="operation-list">
      <div className="ol-header">
        <PlusOutlined onClick={() => handleBtnClick("add")} />
        <ArrowUpOutlined onClick={() => handleBtnClick("up")} />
        <ArrowDownOutlined onClick={() => handleBtnClick("down")} />
        <MinusOutlined onClick={() => handleBtnClick("del")} />
      </div>
      <div className="ol-container">
        <ul className="ol-ul">
          {list.map((item, index) => {
            const { _label, value, ...args } = item;
            return (
              <li
                key={index}
                className={`ol-list-item ${num === index ? "ol-active" : ""}`}
                onClick={() => {
                  setNum(index);
                }}
              >
                <label>{_label}</label>
                <span>{value}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default OperationList;
